import axios from "axios";
import type { Dispatch } from "redux";
import Wix from "wix-sdk";
import jwt_decode from "jwt-decode";

import { errorNotification } from "../notifications/actions";
import { setViewerTourId } from "../viewer/actions";
import { initialState } from "./reducer";

import c from "./constants";
import type { RootState } from "../types";
import type { Font } from "./types";

const BASE_ENDPOINT = "app/wix/settings";
const isDev = process.env.NODE_ENV === "development";
const COMP_ID = "comp-l3loxswy";

export type JWT = {
  instanceId: string;
  sub: string;
};

export const getWidgetSettings =
  (cb?: (tourId: string) => void) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      const params = new URL(document.location as any)?.searchParams;
      const queryCompId = params.get("compId") as string;

      const compId: string = isDev
        ? COMP_ID
        : Wix?.Utils?.getOrigCompId?.() || queryCompId;

      const sub = jwt_decode<JWT>(
        axios.defaults.headers.common["Authorization"] as string
      )?.sub;
      const instanceId = sub?.split("|")[1];

      const origCompId: string = isDev
        ? "null"
        : Wix?.Utils?.getOrigCompId?.() || "null";

      dispatch({ type: c.GET_WIDGET_SETTINGS_REQUEST });

      const { data } = await axios.get(
        `${BASE_ENDPOINT}/${compId}?instanceId=${instanceId}&origCompId=${origCompId}`
      );
      const tourId = data.params
        ? JSON.parse(data.params).manageTours
        : initialState.data.manageTours;

      if (!data.params) {
        dispatch({
          type: c.GET_WIDGET_SETTINGS_SUCCESS,
          payload: initialState.data,
        });
      } else {
        dispatch({
          type: c.GET_WIDGET_SETTINGS_SUCCESS,
          payload: JSON.parse(data.params),
        });
      }
      dispatch(setViewerTourId(tourId));

      cb?.(tourId);
    } catch (err) {
      if (err instanceof Error) {
        dispatch({
          type: c.GET_WIDGET_SETTINGS_ERROR,
          payload: err.message || err,
        });
        dispatch(
          errorNotification(`Widget settings not received: ${err.message}`)
        );
      }
    }
  };
export const updateFonts = (fonts: Array<Font>): any => {
  return {
    type: c.UPDATE_FONTS,
    payload: fonts,
  };
};

export const updateWidgetSettings =
  (data: { key: string; value: any }) =>
  async (dispatch: Dispatch, getState: () => RootState): Promise<void> => {
    try {
      dispatch({ type: c.UPDATE_WIDGET_SETTINGS_REQUEST });
      const compId: string = isDev ? COMP_ID : Wix?.Utils?.getOrigCompId?.();

      const sub = jwt_decode<JWT>(
        axios.defaults.headers.common["Authorization"] as string
      )?.sub;
      const instanceId = sub?.split("|")[1];

      const origCompId: string = isDev
        ? "null"
        : Wix?.Utils?.getOrigCompId?.() || "null";

      Wix.Settings.triggerSettingsUpdatedEvent(data, Wix.Utils.getOrigCompId());

      dispatch({
        type: c.UPDATE_WIDGET_SETTINGS_SUCCESS,
        payload: data,
      });

      await axios.post(`${BASE_ENDPOINT}`, {
        componentId: compId,
        instanceId,
        originComponentId: origCompId,
        params: JSON.stringify(getState().widget.data),
      });
    } catch (err) {
      if (err instanceof Error) {
        dispatch({
          type: c.UPDATE_WIDGET_SETTINGS_ERROR,
          payload: err.message || err,
        });
        dispatch(
          errorNotification(`Widget settings not updated: ${err.message}`)
        );
      }
    }
  };
