import c, { TOUR_MODES } from "./constants";
import type { State } from "./types";
import type { Reducers } from "../types";
import type { AnyAction } from "redux";
import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState: State = {
  imageId: null,
  interfaceObj: null,
  secondInterfaceObj: null,
  tourId: null,
  tourMode: TOUR_MODES.PREVIEW,
  widgetView: false,
};

const reducers: Reducers<State> = {
  [c.SET_VIEWER_IMAGE_ID]: (state, payload: State["imageId"]) => {
    return {
      ...state,
      imageId: payload,
    };
  },
  [c.SET_INTERFACE_OBJECT]: (state, payload: State["interfaceObj"]) => {
    return {
      ...state,
      interfaceObj: payload,
    };
  },
  [c.SET_SECOND_INTERFACE_OBJECT]: (
    state,
    payload: State["secondInterfaceObj"]
  ) => {
    return {
      ...state,
      secondInterfaceObj: payload,
    };
  },
  [c.SET_TOUR_ID]: (state, payload: State["tourId"]) => {
    return {
      ...state,
      tourId: payload,
    };
  },
  [c.SET_TOUR_MODE]: (state, payload: State["tourMode"]) => {
    return {
      ...state,
      tourMode: payload,
    };
  },
  [c.SET_WIDGET_VIEW]: (state, payload: State["widgetView"]) => {
    return {
      ...state,
      widgetView: payload,
    };
  },
  [c.SET_VIEWER_STATE]: (state, payload: State) => {
    return {
      ...state,
      ...payload,
    };
  },
  def: (state) => state,
};

const viewerReducer = (state = initialState, action: AnyAction): State => {
  const relevantReducer = reducers[action.type] || reducers.def;

  return relevantReducer(state, action.payload) as State;
};

export default viewerReducer;

// export default createSlice({
//   name: "viewerReducer",
//   initialState,
//   reducers: {
//     viewerReducer,
//   },
//   extraReducers: {
//     [HYDRATE]: (state, action) => {
//       console.log("HYDRATE", { state, action });
//       return {
//         ...state,
//         ...action.payload,
//       };
//     },
//   },
// });
