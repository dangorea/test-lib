import type { AnyAction, Dispatch } from "redux";

import {
  getIcons,
  getTourPreview,
  requestFullTour,
  requestMyTours,
} from "../tours/actions";
import type { State } from "./types";
import tourC from "../tours/constants";
import c from "./constants";
import { requestMyImages } from "../images/actions";
import { getWidgetSettings } from "../widget/actions";
import { setTimer } from "../test/reducer";
import { CONFIG } from "../../utils/config";
import type { RootState } from "../types";

export const setViewerImageId = (id: State["imageId"]): AnyAction => ({
  type: c.SET_VIEWER_IMAGE_ID,
  payload: id,
});

export const closeViewer = (): AnyAction => setViewerImageId(null);

export const setViewerTourId = (id: State["tourId"]): AnyAction => ({
  type: c.SET_TOUR_ID,
  payload: id,
});

export const closeTourViewer =
  () =>
  (dispatch: Dispatch): void => {
    dispatch(closeViewer());
    dispatch(setViewerTourId(null));
    dispatch(requestMyTours() as any);
    dispatch({ type: tourC.GET_FULL_TOUR_SUCCESS, payload: null });
  };

export const openTourViewer =
  (tourId: string) =>
  (dispatch: any): void => {
    dispatch(requestFullTour(tourId));
    // dispatch(setTimer("test succeed"));
    CONFIG.client !== "viarLive" && dispatch(getWidgetSettings());
    dispatch(getTourPreview(tourId));
    dispatch(setViewerTourId(tourId));
    dispatch(requestMyTours());
    dispatch(requestMyImages());
  };

export const setKrpanoInterface = (krpano: any): AnyAction => ({
  type: c.SET_INTERFACE_OBJECT,
  payload: krpano,
});

export const setSecondKrpanoInterface = (krpano: any): AnyAction => ({
  type: c.SET_SECOND_INTERFACE_OBJECT,
  payload: krpano,
});

export const removeKrpanoInterface = (): AnyAction => setKrpanoInterface(null);

export const removeSecondKrpanoInterface = (): AnyAction =>
  setSecondKrpanoInterface(null);

export const setViewerTourMode = (mode: State["tourMode"]): AnyAction => ({
  type: c.SET_TOUR_MODE,
  payload: mode,
});

export const setWidgetView = (view: State["widgetView"]): AnyAction => ({
  type: c.SET_WIDGET_VIEW,
  payload: view,
});

export const setViewerState = (state: any): AnyAction => ({
  type: c.SET_VIEWER_STATE,
  payload: state.viewer,
});
