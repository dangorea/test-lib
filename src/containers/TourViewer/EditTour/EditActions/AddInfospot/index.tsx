import React, { FC, useCallback, useEffect, useState } from "react";
import ActionsSidebar from "../ActionsSidebar";
import DraggableActionBtn from "../DraggableActionBtn";
import { InfoCircle } from "wix-ui-icons-common";
import { useDispatch, useSelector } from "react-redux";
import {
  getKrpanoInterface,
  getViewerImageId,
} from "../../../../../store/viewer/selectors";
import { VIEWER_CONFIG, Krpano, KrpanoPos } from "../../../../../utils/config";
import { createPortal } from "react-dom";
import { Formik } from "formik";
import {
  INFO_ICON_NAMES,
  initialValues,
  validationSchema,
  Values,
} from "./form";
import FormField from "../../../../../components/Inputs/FormField";
import FormColorInput from "../../../../../components/Inputs/FormColorInput";
import { TMP_HOTSPOT, TMP_HOTSPOT_NAME } from "../constants";
import IconSelect from "../../../../../components/IconSelect";
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
import type { Tour } from "../../../../../utils/types";
import UpdateHotspotVals from "../UpdateHotspotVals";
import { useRefreshHotspots } from "../../../../../utils/hooks/useRefreshHotspots";
import RichTextInput from "../../../../../components/Inputs/RichTextInput";
import HotspotSizeSlider from "../../../../../components/Inputs/HotspotSizeSlider";
import Tooltip from "../../../../../components/Tooltip";
import * as DOMPurify from "dompurify";

type Props = {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
};

const AddInfospot: FC<Props> = ({ open, handleOpen, handleClose }) => {
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
        size: initialValues.size,
        type: HOTSPOT_TYPES.INFO,
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
        content: DOMPurify.sanitize(
          vals.content
        ) /*JSON.stringify(vals.content)*/,
        name: vals.title,
        style: vals.icon,
        size: String(vals.size),
        type: HOTSPOT_TYPES.INFO,
      };

      if (vals.id === TMP_HOTSPOT_NAME) {
        const data = {
          ath: krpano.get(`${TMP_HOTSPOT}.ath`),
          atv: krpano.get(`${TMP_HOTSPOT}.atv`),
          ...commonData,
        };

        dispatch(
          // @ts-ignore
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

        dispatch(
          // @ts-ignore
          updateHotspot(tourId, sphereId, vals.id, data, handleClose)
        );
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
        content: DOMPurify.sanitize(hotspot.content),
        icon: hotspot.style,
        size: hotspot.size || "0.26",
        color: hotspot.color,
      });

      handleOpen();
    },
    [handleOpen, krpano, tour]
  );

  useEffect(() => {
    document.addEventListener("click:infospot", edit);

    return () => document.removeEventListener("click:infospot", edit);
  }, [edit]);

  const onCancel = useCallback(() => {
    krpano.call(`removehotspot(${TMP_HOTSPOT_NAME})`);
    refreshHotspots();
    handleClose();
  }, [handleClose, krpano, refreshHotspots]);

  const onDelete = useCallback(() => {
    dispatch(
      // @ts-ignore
      deleteHotspot(tourId, sphereId, currentHotspot.id, () => {
        krpano.call(`removehotspot(${currentHotspot.id})`);
        handleClose();
      })
    );
  }, [currentHotspot.id, dispatch, handleClose, krpano, sphereId, tourId]);

  return (
    <>
      <DraggableActionBtn
        icon={<InfoCircle height={24} />}
        onDrop={onDrop}
        tooltip="To set an infospot, drag & drop this icon."
      />
      {createPortal(
        <Formik
          initialValues={currentHotspot}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
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
                  // TODO fix here
                  <Tooltip
                    title="Add an infospot to any point on your tour to share a story or tell people more."
                    position="right"
                    theme="#162D3D"
                  >
                    <span>Add Infospot</span>
                  </Tooltip>
                }
              >
                <UpdateHotspotVals vals={currentHotspot} />
                <ChangeIcon />
                <FormField
                  label="Choose a title"
                  name="title"
                  placeholder="Add your title here"
                  required
                />
                <RichTextInput
                  label="Content"
                  name="content"
                  placeholder="Describe your infospot here"
                  required
                  setValueCondition={currentHotspot.id !== values.id}
                  newValue={currentHotspot.content}
                />
                <IconSelect
                  label="Choose an icon"
                  name="icon"
                  iconNames={INFO_ICON_NAMES}
                />
                <HotspotSizeSlider label="Icon size" name="size" />
                <FormColorInput label="Choose an icon color" name="color" />
              </ActionsSidebar>
            );
          }}
        </Formik>,
        document.getElementById(VIEWER_CONFIG.MAIN_VIEWER_ID) as Element
      )}
    </>
  );
};

export default AddInfospot;
