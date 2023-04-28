import type { AnyAction } from "redux";
import c from "./constants";
import type { Reducers } from "../types";
import type { Font, State } from "./types";
import { successReducer, errorReducer, requestReducer } from "../utils";

export const initialState: State = {
  isLoading: false,
  error: null,
  fonts: [],
  data: {
    autostart: false,
    hdl: false,
    showTitle: true,
    spt: true,
    showVr: true,
    sn: true,
    manageTours: "tyvwqn",
    source: "wix",
    showBorder: false,
    borderColor: {
      color: "#ffffff",
      opacity: 1,
    },
    borderWidth: 0,
    tfa: {
      color: "#ffffff",
      opacity: 1,
      editorKey: "",
      family: "ABeeZee",
      fontStyleParam: true,
      preset: "Paragraph 1",
      size: 16,
      style: {
        bold: false,
        italic: false,
        underline: false,
      },
      value: "",
    },
    photoData: {
      color: "#ffffff",
      opacity: 1,
      editorKey: "",
      family: "ABeeZee",
      fontStyleParam: true,
      preset: "Paragraph 2",
      size: 13,
      style: {
        bold: false,
        italic: false,
        underline: false,
      },
      value: "",
    },
  },
};

const reducers: Reducers<State> = {
  [c.GET_WIDGET_SETTINGS_REQUEST]: requestReducer,
  [c.GET_WIDGET_SETTINGS_SUCCESS]: successReducer,
  [c.GET_WIDGET_SETTINGS_ERROR]: errorReducer,

  [c.UPDATE_WIDGET_SETTINGS_REQUEST]: requestReducer,
  [c.UPDATE_WIDGET_SETTINGS_SUCCESS]: (state: State, payload: any): State => {
    const { key, value } = payload;

    if (key === "tfa" || key === "photoData") {
      return {
        ...state,
        data: {
          ...state.data,
          [key]: { ...state.data[key], ...value },
        },
        isLoading: false,
        error: null,
      };
    } else {
      return {
        ...state,
        data: {
          ...state.data,
          [key]: value,
        },
        isLoading: false,
        error: null,
      };
    }
  },
  [c.UPDATE_FONTS]: (state: State, payload: Array<Font>): State => {
    return {
      ...state,
      fonts: payload,
    };
  },
  [c.UPDATE_WIDGET_SETTINGS_ERROR]: errorReducer,

  def: (state) => state,
};

const widgetReducer = (state = initialState, action: AnyAction): State => {
  const relevantReducer = reducers[action.type] || reducers.def;

  return relevantReducer(state, action.payload) as State;
};

export default widgetReducer;
