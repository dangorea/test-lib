import { createRequestTypes } from "../utils";

const c: { [action: string]: string } = {
  ...createRequestTypes("GET_MY_IMAGES"),
  ...createRequestTypes("UPLOAD_IMAGE"),
  ...createRequestTypes("PUT_IMAGE"),
  ...createRequestTypes("DELETE_IMAGE"),
  ...createRequestTypes("DELETE_MANY_IMAGES"),
  ...createRequestTypes("SET_STARTING_POINT"),
  ...createRequestTypes("SET_IMAGE_STATE"),
  SET_UPLOAD_PROGRESS: "SET_UPLOAD_PROGRESS",
};

export default c;
