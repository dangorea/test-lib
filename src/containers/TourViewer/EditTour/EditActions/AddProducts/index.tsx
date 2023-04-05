import React, { FC, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPortal } from "react-dom";
import { Form, Formik } from "formik";
import { getCurrentTour } from "../../../../../store/tours/selectors";
import {
  getKrpanoInterface,
  getViewerImageId,
} from "../../../../../store/viewer/selectors";
import {
  addLinkToProductHotspot,
  deleteLinkToProductHotspot,
  getProductById,
  updateLinkToProductHotspot,
} from "../../../../../store/tours/actions";
import type { Tour } from "../../../../../store/types";
import {
  Hotspot,
  HOTSPOT_TYPES,
  ProductHotspot,
} from "../../../../../store/tours/types";
import { useRemoveHotspotOnImageChange } from "../../../../../utils/hooks/useRemoveHotspotOnImageChange";
import { useRefreshHotspots } from "../../../../../utils/hooks/useRefreshHotspots";
import { useAddHotspot } from "../../../../../utils/hooks/useAddHotspot";
import { getProductHotspotFromTour } from "../../../../../utils/tour";
import type { Krpano, KrpanoPos } from "../../../../../utils/config";
import { VIEWER_CONFIG } from "../../../../../utils/config";
import FormColorInput from "../../../../../components/Inputs/FormColorInput";
import FormField from "../../../../../components/Inputs/FormField";
import DraggableActionBtn from "../DraggableActionBtn";
import UpdateHotspotVals from "../UpdateHotspotVals";
import ActionsSidebar from "../ActionsSidebar/index";
import IconSelect from "../../../../../components/IconSelect";
import ChangeIcon from "../ChangeIcon";
import ProductIcon from "../ProductIcon";
import {
  HOTSPOT_ICON_NAMES,
  initialValues,
  validationSchema,
  Values,
} from "./form";
import { SvgIconHover } from "./styles";
import { TMP_HOTSPOT, TMP_HOTSPOT_NAME } from "../constants";
import ProductInput from "../../../../../components/Inputs/ProductInput";
import HotspotSizeSlider from "../../../../../components/Inputs/HotspotSizeSlider";
import Tooltip from "../../../../../components/Tooltip";
import ProductPreview from "../../../../../components/ProductPreview";
import Wix from "wix-sdk";

type Props = {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
};

const AddProduct: FC<Props> = ({ open, handleOpen, handleClose }) => {
  const krpano = useSelector(getKrpanoInterface()) as Krpano;
  const tour = useSelector(getCurrentTour()) as unknown as Tour;
  const tourId = tour.id;
  const imageId = useSelector(getViewerImageId()) as string;
  const addViewerHotspot = useAddHotspot();
  const refreshHotspots = useRefreshHotspots();
  const instanceId = Wix.Utils.getInstanceId();

  const [currentHotspot, setCurrentHotspot] = useState<Values>(initialValues);
  const [eventHandler, setEventHandler] = useState(false);
  const dispatch = useDispatch();

  const onDrop = useCallback(
    (pos: KrpanoPos) => {
      addViewerHotspot({
        ath: pos.x,
        atv: pos.y,
        style: initialValues.icon,
        color: initialValues.color,
        size: initialValues.size,
        type: HOTSPOT_TYPES.PRODUCT,
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
        wixProductId: vals.wixProductId,
        target: vals.target,
        title: vals.title,
        style: vals.icon,
        size: String(vals.size),
        type: HOTSPOT_TYPES.PRODUCT,
      };

      if (vals.id === TMP_HOTSPOT_NAME) {
        const data = {
          ath: krpano.get(`${TMP_HOTSPOT}.ath`),
          atv: krpano.get(`${TMP_HOTSPOT}.atv`),
          ...commonData,
        };

        dispatch(
          addLinkToProductHotspot(tourId, imageId, data, (newHotspot) => {
            krpano.call(`removehotspot(${TMP_HOTSPOT_NAME})`);
            addViewerHotspot(newHotspot);
            handleClose();
          })
        );
      } else {
        const hotspot = getProductHotspotFromTour(
          tour,
          vals.id,
          imageId
        ) as ProductHotspot;

        const data = {
          ...hotspot,
          ...commonData,
        };
        dispatch(
          updateLinkToProductHotspot(tourId, imageId, vals.id, data, () => {
            handleClose();
          })
        );
      }
    },
    [krpano, dispatch, tourId, imageId, addViewerHotspot, handleClose, tour]
  );

  const edit = useCallback(
    async (e: any) => {
      if (e.scene !== TMP_HOTSPOT_NAME) {
        krpano.call(`removehotspot(${TMP_HOTSPOT_NAME})`);
      }

      const hotspot = getProductHotspotFromTour(
        tour,
        e.scene,
        imageId
      ) as Hotspot;

      await getProductById(instanceId, hotspot.wixProductId as string).then(
        (res) =>
          setCurrentHotspot({
            id: hotspot.id,
            title: hotspot.title || "",
            target: res.name,
            wixProductId: hotspot.wixProductId || "",
            icon: hotspot.style,
            size: hotspot.size || "0.26",
            color: hotspot.color,
            product: res,
          })
      );

      handleOpen();
    },
    [handleOpen, imageId, krpano, tour]
  );

  useEffect(() => {
    document.addEventListener("click:product", edit);

    return () => document.removeEventListener("click:product", edit);
  }, [edit]);

  const onCancel = useCallback(() => {
    setCurrentHotspot(initialValues);
    krpano.call(`removehotspot(${TMP_HOTSPOT_NAME})`);
    refreshHotspots();
    handleClose();
  }, [handleClose, krpano, refreshHotspots]);

  const onDelete = useCallback(() => {
    dispatch(
      deleteLinkToProductHotspot(tourId, imageId, currentHotspot.id, () => {
        krpano.call(`removehotspot(${currentHotspot.id})`);
        handleClose();
      })
    );
  }, [currentHotspot.id, dispatch, handleClose, krpano, imageId, tourId]);

  useEffect(() => {
    return () => setEventHandler((prev) => !prev);
  }, [onCancel, onDelete, handleSubmit, edit]);

  return (
    <>
      <SvgIconHover>
        <DraggableActionBtn
          icon={<ProductIcon />}
          onDrop={onDrop}
          tooltip="To add a product, drag & drop this icon."
        />
      </SvgIconHover>
      {createPortal(
        <Formik
          initialValues={currentHotspot}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ submitForm }) => {
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
                    title="Add Wix products to your virtual tour."
                    position="right"
                    theme="#162D3D"
                  >
                    <span>Add Products</span>
                  </Tooltip>
                }
              >
                <Form
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  <UpdateHotspotVals vals={currentHotspot} />
                  <ChangeIcon />
                  <FormField
                    label="Choose a title"
                    name="title"
                    placeholder="Add your title here"
                    required
                  />
                  <ProductInput
                    label="Search product name"
                    name="target"
                    identifier="wixProductId"
                    required
                    eventHandler={eventHandler}
                    currentHotspot={currentHotspot}
                  />
                  <ProductPreview name="product" />
                  <IconSelect
                    label="Choose an icon"
                    name="icon"
                    iconNames={HOTSPOT_ICON_NAMES}
                  />
                  <HotspotSizeSlider label="Icon size" name="size" />
                  <FormColorInput label="Choose an icon color" name="color" />
                </Form>
              </ActionsSidebar>
            );
          }}
        </Formik>,
        document.getElementById(VIEWER_CONFIG.MAIN_VIEWER_ID) as Element
      )}
    </>
  );
};

export default AddProduct;
