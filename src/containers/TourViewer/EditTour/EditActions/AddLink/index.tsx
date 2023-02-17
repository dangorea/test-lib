import React, { FC, useCallback, useEffect, useState } from "react";
import ActionsSidebar from "../ActionsSidebar";
import DraggableActionBtn from "../DraggableActionBtn";
import { Link } from "wix-ui-icons-common";
// import { Heading, Tooltip } from "wix-style-react";
import { useDispatch, useSelector } from "react-redux";
import {
  getKrpanoInterface,
  getViewerImageId,
} from "../../../../../store/viewer/selectors";
import type { Krpano, KrpanoPos } from "../../../../../utils/config";
import { createPortal } from "react-dom";
import { VIEWER_CONFIG } from "../../../../../utils/config";
import { Form, Formik, FormikHelpers } from "formik";
import {
  initialValues,
  LINK_ICON_NAMES,
  validationSchema,
  Values,
} from "./form";
import FormField, {
  TypeFormField,
} from "../../../../../components/Inputs/FormField";
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
import { getHotspotFromTour } from "../../../../../utils/tour";
import { getCurrentTour } from "../../../../../store/tours/selectors";
import type { Tour } from "../../../../../store/types";
import UpdateHotspotVals from "../UpdateHotspotVals";
import { useRefreshHotspots } from "../../../../../utils/hooks/useRefreshHotspots";
import { useRemoveHotspotOnImageChange } from "../../../../../utils/hooks/useRemoveHotspotOnImageChange";
import HotspotSizeSlider from "../../../../../components/Inputs/HotspotSizeSlider";
import Tooltip from "../../../../../components/Tooltip";

type Props = {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
};

const hasHttpsLink = (url: string): string => {
  if (url.startsWith("https://")) {
    return url;
  }
  return `https://${url}`;
};

const AddLink: FC<Props> = ({ open, handleOpen, handleClose }) => {
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
        type: HOTSPOT_TYPES.URL,
        size: initialValues.size,
      } as unknown as Hotspot);

      setCurrentHotspot(initialValues);

      handleOpen();
    },
    [addViewerHotspot, handleOpen]
  );

  useRemoveHotspotOnImageChange(imageId, handleClose);

  const handleSubmit = useCallback(
    (vals: Values, formikHelpers: FormikHelpers<Values>) => {
      const commonData = {
        color: vals.color,
        content: hasHttpsLink(vals.url),
        name: vals.title,
        style: vals.icon,
        size: String(vals.size),
        type: HOTSPOT_TYPES.URL,
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
            formikHelpers.resetForm();
          })
        );
      } else {
        const hotspot = getHotspotFromTour(tour, vals.id);

        const data = {
          ...hotspot,
          ...commonData,
        };

        dispatch(
          updateHotspot(tourId, sphereId, vals.id, data, () => {
            handleClose();
            formikHelpers.resetForm();
          })
        );
      }
    },
    [addViewerHotspot, dispatch, handleClose, krpano, sphereId, tour, tourId]
  );

  const editLink = useCallback(
    (e: any) => {
      if (e.scene !== TMP_HOTSPOT_NAME) {
        krpano.call(`removehotspot(${TMP_HOTSPOT_NAME})`);
      }

      const hotspot = getHotspotFromTour(tour, e.scene) as Hotspot;

      setCurrentHotspot({
        id: hotspot.id,
        title: hotspot.name,
        url: hotspot.content,
        icon: hotspot.style,
        color: hotspot.color,
        size: hotspot.size || "0.26",
      });

      handleOpen();
    },
    [handleOpen, krpano, tour]
  );

  useEffect(() => {
    document.addEventListener("click:linkspot", editLink);

    return () => document.removeEventListener("click:linkspot", editLink);
  }, [editLink]);

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
        icon={<Link height={24} />}
        onDrop={onDrop}
        tooltip="To include a link, drag & drop this icon."
      />
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
                // TODO fix here
                <Tooltip
                  title="Link your visitors to any page or website you want."
                  position="right"
                  theme="#162D3D"
                >
                  <span>Add Link</span>
                </Tooltip>
              }
            >
              <Form>
                <UpdateHotspotVals vals={currentHotspot} />
                <ChangeIcon />
                <FormField
                  label="Choose a title"
                  name="title"
                  placeholder="Add your title here"
                  required
                />
                <FormField
                  label="URL"
                  name="url"
                  placeholder="Add your URL here"
                  type={TypeFormField.URL}
                  required
                />
                <IconSelect
                  label="Choose an icon"
                  name="icon"
                  iconNames={LINK_ICON_NAMES}
                />
                <HotspotSizeSlider label="Icon size" name="size" />
                <FormColorInput label="Choose an icon color" name="color" />
              </Form>
            </ActionsSidebar>
          )}
        </Formik>,
        document.getElementById(VIEWER_CONFIG.MAIN_VIEWER_ID) as Element
      )}
    </>
  );
};

export default AddLink;
