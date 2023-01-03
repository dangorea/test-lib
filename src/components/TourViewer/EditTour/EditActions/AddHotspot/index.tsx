import React, { FC, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDragDropManager } from "react-dnd";
import { createPortal } from "react-dom";
import { Form, Formik } from "formik";
import { Button, FileUpload, Heading, Tooltip } from "wix-style-react";

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
import { isJsonString, uploadIcons } from "../../../../../store/icons/actions";
import type { Tour } from "../../../../../store/types";
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
import IconSelect from "../IconSelect";
import ChangeIcon from "../ChangeIcon";
import HotspotIcon from "../HotspotIcon";
import {
  HOTSPOT_ICON_NAMES,
  initialValues,
  validationSchema,
  Values,
} from "./form";

import {
  IconSelectWrapper,
  LoadingSpinner,
  SvgIconHover,
  TooltipWrapper,
  UploadBtnWrapper,
} from "./styles";

import { TMP_HOTSPOT, TMP_HOTSPOT_NAME } from "../constants";
import { setStartingPoint } from "../../../../../store/images/actions";
import { errorNotification } from "../../../../../store/notifications/actions";
import _ from "lodash";
import { InfoCircle } from "wix-ui-icons-common";
import HotspotSizeSlider from "../../../../../components/Inputs/HotspotSizeSlider";

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
  const [uploadAction, setUploadAction] = useState<boolean>(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const monitor = dragDropManager.getMonitor();

    const listener = () => {
      if (monitor.getItemType() === ADD_IMAGE_HOTSPOT && monitor.didDrop()) {
        const res = monitor.getDropResult();

        if (res) {
          const { x, y } = res;

          const pos = krpano.screentosphere(x, y);

          const target = monitor.getItem().target;
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
          updateLinkToImageHotspot(tourId, sphereId, vals.id, data, () => {
            handleClose();
          })
        );
      }

      dispatch(
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
      deleteLinkToImageHotspot(tourId, sphereId, currentHotspot.id, () => {
        krpano.call(`removehotspot(${currentHotspot.id})`);
        handleClose();
      })
    );
  }, [currentHotspot.id, dispatch, handleClose, krpano, sphereId, tourId]);

  const uploadFiles = useCallback(
    (files: File[] | FileList) => {
      Array.from(files).forEach((file) => {
        if (
          file.type === "image/png" ||
          file.type === "image/jpeg" ||
          file.type === "image/jpg"
        ) {
          if (file.size <= 500000) {
            dispatch(uploadIcons(file, _, setUploadAction));
          } else {
            dispatch(
              errorNotification(
                "File size should be less or equal to 500 Kilobytes"
              )
            );
          }
        } else {
          dispatch(errorNotification("File type should be JPG, PNG"));
        }
      });
    },
    [dispatch]
  );

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
                  placement="right"
                  content="Feature another image in your virtual tour. When visitors click the hotspot icon, they'll switch to a new image."
                >
                  <Heading appearance="H2" light>
                    Add Hotspot
                  </Heading>
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
                <IconSelectWrapper>
                  <IconSelect
                    label="Choose an icon"
                    name="icon"
                    iconNames={HOTSPOT_ICON_NAMES}
                    setCurrentStyle={setCurrentStyle}
                  />
                  <FileUpload
                    onChange={uploadFiles}
                    multiple
                    accept=".jpeg,.jpg,.png"
                  >
                    {({ openFileUploadDialog }) => (
                      <UploadBtnWrapper>
                        <TooltipWrapper>
                          <Tooltip content="Icons must have a maximum size of 150x150 pixels.">
                            <InfoCircle width={25} height={25} />
                          </Tooltip>
                        </TooltipWrapper>
                        <Button onClick={openFileUploadDialog}>
                          {!uploadAction ? "Upload a Icon" : <LoadingSpinner />}
                        </Button>
                      </UploadBtnWrapper>
                    )}
                  </FileUpload>
                </IconSelectWrapper>
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
