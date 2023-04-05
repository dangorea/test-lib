import * as yup from "yup";
import { TMP_HOTSPOT_NAME } from "../constants";
import type { ProductHotspot } from "../../../../../utils/types";

export type Values = {
  id: string;
  title: string;
  target: string;
  icon: string;
  color: string;
  size: string;
  wixProductId: string;
  product: ProductHotspot | null;
};

export const HOTSPOT_ICON_NAMES = [
  "product",
  "product2",
  "product3",
  "product-no-blur",
  "product2-no-blur",
  "product3-no-blur",
];

export const initialValues: Values = {
  id: TMP_HOTSPOT_NAME,
  title: "",
  target: "",
  wixProductId: "",
  icon: HOTSPOT_ICON_NAMES[0],
  color: "#ffffff",
  size: "0.26",
  product: null,
};

export const validationSchema = yup.object().shape({
  title: yup.string().required("Required"),
  target: yup.string().required("Required"),
  icon: yup.string().required("Required"),
  color: yup.string().required("Required"),
});
