import React, { FC, useCallback, useEffect, useState } from "react";
import ActionsSidebar from "../ActionsSidebar";
import DraggableActionBtn from "../DraggableActionBtn";
import { useDispatch, useSelector } from "react-redux";
import {
  getKrpanoInterface,
  getViewerImageId,
} from "../../../../../store/viewer/selectors";
import { Krpano, KrpanoPos, VIEWER_CONFIG } from "../../../../../utils/config";
import { createPortal } from "react-dom";
import { Formik } from "formik";
import { initialValues, validationSchema, Values } from "./form";
import FormField from "../../../../../components/Inputs/FormField";
import { TMP_HOTSPOT, TMP_HOTSPOT_NAME } from "../constants";
import {
  addHotspot,
  deleteHotspot,
  updateHotspot,
} from "../../../../../store/tours/actions";
import ChangeIcon from "../ChangeIcon";
import { Hotspot, HOTSPOT_TYPES } from "../../../../../store/tours/types";
import { useAddHotspot } from "../../../../../utils/hooks/useAddHotspot";
import { useRemoveHotspotOnImageChange } from "../../../../../utils/hooks/useRemoveHotspotOnImageChange";
import { getHotspotFromTour } from "../../../../../utils/tour";
import { getCurrentTour } from "../../../../../store/tours/selectors";
import type { Tour } from "../../../../../store/types";
import UpdateHotspotVals from "../UpdateHotspotVals";
import { useRefreshHotspots } from "../../../../../utils/hooks/useRefreshHotspots";
import FlatImageInput from "../../../../../components/Inputs/FlatImageInput";
import FlatImageIcon from "../FlatImageIcon";
import HotspotSizeSlider from "../../../../../components/Inputs/HotspotSizeSlider";
import RichTextInput from "../../../../../components/Inputs/RichTextInput";
import Tooltip from "../../../../../components/Tooltip";

type Props = {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
};

const AddFlatImage: FC<Props> = ({ open, handleOpen, handleClose }) => {
  const krpano = useSelector(getKrpanoInterface()) as Krpano;
  const tour = useSelector(getCurrentTour()) as Tour;
  const tourId = tour.id;
  const imageId = useSelector(getViewerImageId()) as string;
  const sphereId = useSelector(getViewerImageId()) as string;
  const addViewerHotspot = useAddHotspot();
  const refreshHotspots = useRefreshHotspots();

  const [currentHotspot, setCurrentHotspot] = useState<Values>(initialValues);

  const dispatch = useDispatch();

  const onDrop = useCallback(
    (pos: KrpanoPos) => {
      addViewerHotspot({
        ath: pos.x,
        atv: pos.y,
        style: initialValues.icon,
        color: initialValues.color,
        content: initialValues.content,
        target: initialValues.target,
        type: HOTSPOT_TYPES.FLAT,
        width: initialValues.width,
        height: initialValues.height,
        size: initialValues.size,
      } as unknown as Hotspot);

      setCurrentHotspot(initialValues);

      handleOpen();
    },
    [addViewerHotspot, handleOpen]
  );

  useRemoveHotspotOnImageChange(imageId, handleClose);

  const handleSubmit = useCallback(
    (vals: Values) => {
      const commonData = {
        color: vals.color,
        content: /*sanitize(vals.content)*/ vals.content,
        target: vals.target,
        name: vals.title,
        style: vals.icon,
        type: HOTSPOT_TYPES.FLAT,
        width: vals.width,
        height: vals.height,
        size: String(vals.size),
      };

      if (vals.id === TMP_HOTSPOT_NAME) {
        const data = {
          ath: krpano.get(`${TMP_HOTSPOT}.ath`),
          atv: krpano.get(`${TMP_HOTSPOT}.atv`),
          ...commonData,
        };

        dispatch(
          addHotspot(tourId, sphereId, data, (newHotspot) => {
            krpano.call(`removehotspot(${TMP_HOTSPOT_NAME})`);
            addViewerHotspot(newHotspot);
            handleClose();
          })
        );
      } else {
        const hotspot = getHotspotFromTour(tour, vals.id);

        const data = {
          ...hotspot,
          ...commonData,
        };

        dispatch(updateHotspot(tourId, sphereId, vals.id, data, handleClose));
      }
    },
    [addViewerHotspot, dispatch, handleClose, krpano, sphereId, tour, tourId]
  );

  const edit = useCallback(
    (e: any) => {
      if (e.scene !== TMP_HOTSPOT_NAME) {
        krpano.call(`removehotspot(${TMP_HOTSPOT_NAME})`);
      }

      const hotspot = getHotspotFromTour(tour, e.scene) as Hotspot;

      setCurrentHotspot({
        id: hotspot.id,
        title: hotspot.name,
        content: hotspot.content,
        target: hotspot.target || "",
        icon: hotspot.style,
        color: hotspot.color,
        width: hotspot.width || "",
        height: hotspot.height || "",
        size: hotspot.size || "0.5",
      });

      handleOpen();
    },
    [handleOpen, addViewerHotspot, krpano, tour]
  );

  useEffect(() => {
    document.addEventListener("click:flatspot", edit);

    return () => document.removeEventListener("click:flatspot", edit);
  }, [edit]);

  const onCancel = useCallback(() => {
    krpano.call(`removehotspot(${TMP_HOTSPOT_NAME})`);
    refreshHotspots();
    handleClose();
  }, [handleClose, krpano, refreshHotspots]);

  const onDelete = useCallback(() => {
    dispatch(
      deleteHotspot(tourId, sphereId, currentHotspot.id, () => {
        krpano.call(`removehotspot(${currentHotspot.id})`);
        handleClose();
      })
    );
  }, [currentHotspot.id, dispatch, handleClose, krpano, sphereId, tourId]);

  return (
    <>
      <DraggableActionBtn
        icon={<FlatImageIcon />}
        onDrop={onDrop}
        tooltip="To set a Flat Image, drag & drop this icon."
      />
      {createPortal(
        <Formik
          initialValues={currentHotspot}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          onDrop={onDrop}
        >
          {({ submitForm, values }) => {
            return (
              <ActionsSidebar
                open={open}
                handleClose={onCancel}
                onSave={submitForm}
                onDelete={
                  currentHotspot.id !== TMP_HOTSPOT_NAME ? onDelete : undefined
                }
                title={
                  <Tooltip
                    title="Add an Flat Image to any point on your tour to share a story or tell people more."
                    position="right"
                    theme="#162D3D"
                  >
                    <span>Add Flat Image</span>
                  </Tooltip>
                }
              >
                <UpdateHotspotVals vals={currentHotspot} />
                <ChangeIcon hotspotType={String(HOTSPOT_TYPES.FLAT)} />
                <FormField
                  label="Choose a title"
                  name="title"
                  placeholder="Add your title here"
                  required
                />
                <FlatImageInput
                  label="Choose an image"
                  name="target"
                  height="height"
                  width="width"
                  required
                />
                <HotspotSizeSlider label="Image size" name="size" />
                <RichTextInput
                  label="Content"
                  name="content"
                  placeholder="Describe your flatspot here"
                  setValueCondition={currentHotspot.id !== values.id}
                  newValue={currentHotspot.content}
                />
              </ActionsSidebar>
            );
          }}
        </Formik>,
        document.getElementById(VIEWER_CONFIG.MAIN_VIEWER_ID) as Element
      )}
    </>
  );
};

export default AddFlatImage;
