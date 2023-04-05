import { createRequestTypes } from "../utils";

const TOUR_CONSTANTS = {
  ...createRequestTypes("GET_MY_TOURS"),
  ...createRequestTypes("UPDATE_TOUR"),
  ...createRequestTypes("DELETE_TOUR"),
  ...createRequestTypes("CREATE_TOUR"),
  ...createRequestTypes("GET_FULL_TOUR"),
  ...createRequestTypes("GET_TOUR_PREVIEW"),
  ...createRequestTypes("UPDATE_TOUR_COVER"),
  ...createRequestTypes("UPDATE_TOUR_STARTING_POINT"),
  ...createRequestTypes("MANAGE_SPHERES"),
  ...createRequestTypes("ADD_HOTSPOT"),
  ...createRequestTypes("UPDATE_HOTSPOT"),
  ...createRequestTypes("DELETE_HOTSPOT"),
  ...createRequestTypes("UPLOAD_FLOOR_IMAGE"),
  ...createRequestTypes("UPDATE_FLOOR_IMAGE"),
  ...createRequestTypes("DELETE_FLOOR_IMAGE"),
  ...createRequestTypes("ADD_FLOOR_LEVEL_LINK"),
  ...createRequestTypes("UPDATE_FLOOR_LEVEL_LINK"),
  ...createRequestTypes("DELETE_FLOOR_LEVEL_LINK"),
  ...createRequestTypes("SET_CURRENT_TOUR"),
  ...createRequestTypes("GET_ICONS"),
  ...createRequestTypes("DELETE_ICONS"),
};

export default TOUR_CONSTANTS;

export enum TOUR_ACTIONS {
  DELETE = "DELETE",
  ADD = "ADD",
  REORDER = "REORDER",
}
