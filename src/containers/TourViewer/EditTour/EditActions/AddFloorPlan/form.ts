import * as yup from "yup";
import type { Level, Link } from "../../../../../store/types";

export type Values = {
  id: string;
  name: string;
  title: string;
  level: Level;
  link: Link[];
  toggle: boolean;
};

export const initialValues: Values = {
  id: "",
  title: "",
  level: {
    id: "",
    name: "",
    title: "",
    links: null,
  },
  link: [],
  name: "",
  toggle: false,
};

export const validationSchema = yup.object().shape({
  title: yup.string().required("Required"),
  level: yup.object().required("Required"),
});
