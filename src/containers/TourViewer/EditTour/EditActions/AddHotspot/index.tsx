import React, { FC, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDragDropManager } from "react-dnd";
import { createPortal } from "react-dom";
import { Form, Formik } from "formik";
import { getCurrentTour } from "../../../../../store/tours/selectors";
import {
  getKrpanoInterface,
  getSecondKrpanoInterface,
  getViewerImageId,
} from "../../../../../store/viewer/selectors";
import {
  addLinkToImageHotspot,
  deleteLinkToImageHotspot,
  updateLinkToImageHotspot,
} from "../../../../../store/tours/actions";
import { isJsonString } from "../../../../../store/tours/actions";
import type { Tour } from "../../../../../utils/types";
import {
  Hotspot,
  HOTSPOT_TYPES,
  LinkHotspot,
} from "../../../../../store/tours/types";
import { useRemoveHotspotOnImageChange } from "../../../../../utils/hooks/useRemoveHotspotOnImageChange";
import { useRefreshHotspots } from "../../../../../utils/hooks/useRefreshHotspots";
import { useAddHotspot } from "../../../../../utils/hooks/useAddHotspot";
import SphereInput from "../../../../../components/Inputs/SphereInput";
import {
  getHotspotFromTour,
  getLinkToImageHotspotFromTour,
} from "../../../../../utils/tour";
import { VIEWER_CONFIG, Krpano, KrpanoPos } from "../../../../../utils/config";
import FormColorInput from "../../../../../components/Inputs/FormColorInput";
import FormField from "../../../../../components/Inputs/FormField";
import { ADD_IMAGE_HOTSPOT } from "../../EditBottomBar/ImageListItem";
import DraggableActionBtn from "../DraggableActionBtn";
import UpdateHotspotVals from "../UpdateHotspotVals";
import ActionsSidebar from "../ActionsSidebar";
import IconSelect from "../../../../../components/IconSelect";
import ChangeIcon from "../ChangeIcon";
import HotspotIcon from "../HotspotIcon";
import {
  HOTSPOT_ICON_NAMES,
  initialValues,
  validationSchema,
  Values,
} from "./form";
import { SvgIconHover } from "./styles";

import { TMP_HOTSPOT, TMP_HOTSPOT_NAME } from "../constants";
import { setStartingPoint } from "../../../../../store/images/actions";
import HotspotSizeSlider from "../../../../../components/Inputs/HotspotSizeSlider";
import Tooltip from "../../../../../components/Tooltip";
// import { Button, FileUpload, Heading, Tooltip } from "wix-style-react";

type Props = {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
};

const AddHotspot: FC<Props> = ({ open, handleOpen, handleClose }) => {
  const krpano = useSelector(getKrpanoInterface()) as Krpano;
  const secondKrpano = useSelector(getSecondKrpanoInterface()) as Krpano;
  const tour = useSelector(getCurrentTour()) as Tour;
  const tourId = tour?.id;
  const imageId = useSelector(getViewerImageId()) as string;
  const sphereId = useSelector(getViewerImageId()) as string;
  const addViewerHotspot = useAddHotspot();
  const refreshHotspots = useRefreshHotspots();
  const dragDropManager = useDragDropManager();

  const [currentHotspot, setCurrentHotspot] = useState<Values>(initialValues);
  const [currentStyle, setCurrentStyle] = useState<string>("");

  const dispatch = useDispatch();

  useEffect(() => {
    const monitor = dragDropManager.getMonitor();

    const listener = () => {
      if (monitor.getItemType() === ADD_IMAGE_HOTSPOT && monitor.didDrop()) {
        const res = monitor.getDropResult();

        if (res) {
          const { x, y } = res;

          const pos = krpano.screentosphere(x, y);

          const target = monitor?.getItem()?.target;
          const tourSphere = tour.spheres.find(({ id }) => id === target);
          const fileName = tourSphere?.name.split(".")[0];

          addViewerHotspot({
            ath: pos.x,
            atv: pos.y,
            style: initialValues.icon,
            color: initialValues.color,
            width: initialValues.width,
            height: initialValues.height,
            type: HOTSPOT_TYPES.LINK,
          } as unknown as Hotspot);

          setCurrentHotspot({
            ...initialValues,
            target: target,
            title: fileName || "",
          });

          handleOpen();
        }
      }
    };

    const unsubscribe = monitor.subscribeToStateChange(listener);

    return () => unsubscribe();
  }, [addViewerHotspot, dragDropManager, handleOpen, krpano]);

  const onDrop = useCallback(
    (pos: KrpanoPos) => {
      addViewerHotspot({
        ath: pos.x,
        atv: pos.y,
        style: initialValues.icon,
        color: initialValues.color,
        width: initialValues.width,
        height: initialValues.height,
        type: HOTSPOT_TYPES.LINK,
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
        target: vals.target,
        title: vals.title,
        style: vals.icon,
        hotspotStartingPoint: {
          sphereId: vals.target,
          fov: secondKrpano.get("view.fov"),
          ath: secondKrpano.get("view.hlookat"),
          atv: secondKrpano.get("view.vlookat"),
        },
        width: String(vals.width),
        height: String(vals.width),
      };

      if (vals.id === TMP_HOTSPOT_NAME) {
        const data = {
          ath: krpano.get(`${TMP_HOTSPOT}.ath`),
          atv: krpano.get(`${TMP_HOTSPOT}.atv`),
          ...commonData,
        };

        dispatch(
          // @ts-ignore
          addLinkToImageHotspot(tourId, sphereId, data, (newHotspot) => {
            krpano.call(`removehotspot(${TMP_HOTSPOT_NAME})`);
            addViewerHotspot(newHotspot);
            handleClose();
          })
        );
      } else {
        const hotspot = getLinkToImageHotspotFromTour(
          tour,
          vals.id
        ) as LinkHotspot;

        const data = {
          ...hotspot,
          ...commonData,
        };

        dispatch(
          // @ts-ignore
          updateLinkToImageHotspot(tourId, sphereId, vals.id, data, () => {
            handleClose();
          })
        );
      }

      dispatch(
        // @ts-ignore
        setStartingPoint(
          {
            sphereId: vals.target,
            fov: secondKrpano.get("view.fov"),
            ath: secondKrpano.get("view.hlookat"),
            atv: secondKrpano.get("view.vlookat"),
          },
          undefined,
          true
        )
      );
    },
    [
      addViewerHotspot,
      dispatch,
      handleClose,
      krpano,
      sphereId,
      tour,
      tourId,
      secondKrpano,
    ]
  );

  const edit = useCallback(
    (e: any) => {
      if (e.scene !== TMP_HOTSPOT_NAME) {
        krpano.call(`removehotspot(${TMP_HOTSPOT_NAME})`);
      }

      const hotspot = getHotspotFromTour(tour, e.scene) as Hotspot;

      if (secondKrpano && hotspot && hotspot.hotspotStartingPoint) {
        secondKrpano.set("view.hlookat", hotspot.hotspotStartingPoint.ath);
        secondKrpano.set("view.vlookat", hotspot.hotspotStartingPoint.atv);
        secondKrpano.set("view.fov", hotspot.hotspotStartingPoint.fov);
      }

      setCurrentHotspot({
        id: hotspot.id,
        title: hotspot.name,
        target: hotspot.content,
        icon: hotspot.style,
        width: hotspot.width || "0.26",
        height: hotspot.height || "0.26",
        color: hotspot.color,
      });

      handleOpen();
    },
    [handleOpen, krpano, tour]
  );

  useEffect(() => {
    document.addEventListener("click:hotspot", edit);

    return () => document.removeEventListener("click:hotspot", edit);
  }, [edit]);

  const onCancel = useCallback(() => {
    krpano.call(`removehotspot(${TMP_HOTSPOT_NAME})`);
    refreshHotspots();
    handleClose();
  }, [handleClose, krpano, refreshHotspots]);

  const onDelete = useCallback(() => {
    dispatch(
      // @ts-ignore
      deleteLinkToImageHotspot(tourId, sphereId, currentHotspot.id, () => {
        krpano.call(`removehotspot(${currentHotspot.id})`);
        handleClose();
      })
    );
  }, [currentHotspot.id, dispatch, handleClose, krpano, sphereId, tourId]);

  return (
    <>
      <SvgIconHover>
        <DraggableActionBtn
          icon={<HotspotIcon />}
          onDrop={onDrop}
          tooltip="To set a hotspot, drag & drop this icon."
        />
      </SvgIconHover>
      {createPortal(
        <Formik
          initialValues={currentHotspot}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ submitForm }) => (
            <ActionsSidebar
              open={open}
              handleClose={onCancel}
              onSave={submitForm}
              onDelete={
                currentHotspot.id !== TMP_HOTSPOT_NAME ? onDelete : undefined
              }
              title={
                <Tooltip
                  title="Feature another image in your virtual tour. When visitors click the hotspot icon, they'll switch to a new image."
                  position="right"
                  theme="#162D3D"
                >
                  <span>Add Hotspot</span>
                </Tooltip>
              }
            >
              <Form
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "700px",
                }}
              >
                <UpdateHotspotVals vals={currentHotspot} />
                <ChangeIcon hotspotType={String(HOTSPOT_TYPES.LINK)} />
                <FormField
                  label="Choose a title"
                  name="title"
                  placeholder="Add your title here"
                  required
                />
                <SphereInput label="Choose an image" name="target" required />
                <IconSelect
                  label="Choose an icon"
                  name="icon"
                  iconNames={HOTSPOT_ICON_NAMES}
                  setCurrentStyle={setCurrentStyle}
                />
                <HotspotSizeSlider label="Icon size" name="width" />
                {!isJsonString(currentStyle) && (
                  <FormColorInput label="Choose an icon color" name="color" />
                )}
              </Form>
            </ActionsSidebar>
          )}
        </Formik>,
        document.getElementById(VIEWER_CONFIG.MAIN_VIEWER_ID) as Element
      )}
    </>
  );
};

export default AddHotspot;
