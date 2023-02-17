import type { RootState } from "../types";
import type { State } from "./types";

export const getViewerImageId =
  () =>
  (state: RootState): State["imageId"] => {
    return state?.viewer?.imageId;
  };

export const getTourId =
  () =>
  (state: RootState): State["tourId"] =>
    state?.viewer?.tourId;

export const getKrpanoInterface =
  () =>
  (state: RootState): State["interfaceObj"] =>
    state?.viewer?.interfaceObj;

export const getSecondKrpanoInterface =
  () =>
  (state: RootState): State["secondInterfaceObj"] =>
    state?.viewer?.secondInterfaceObj;

export const getViewerTourMode =
  () =>
  (state: RootState): State["tourMode"] =>
    state?.viewer?.tourMode;

export const getTypeOfView =
  () =>
  (state: RootState): State["widgetView"] =>
    state?.viewer?.widgetView;
