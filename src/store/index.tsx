import type { AnyAction, compose, Middleware } from "redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import toursReducer from "./tours/reducer";
import imagesReducer from "./images/reducer";
import notificationsReducer from "./notifications/reducer";
import viewerReducer from "./viewer/reducer";
import widgetReducer from "./widget/reducer";
import sourceReducer from "./config/reducer";
import { getCookie } from "cookies-next";
import axios from "axios";
import { CONFIG, EVAPORATE_CONFIG } from "../utils/config";
import type { Dispatch } from "react";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const getViarTokenMiddleware: Middleware = () => {
  return (next) => (action: AnyAction) => {
    if (!axios.defaults.headers.common["Authorization"]) {
      const params = new URL(document.location as any)?.searchParams;
      const queryInstance = params.get("instance");

      return axios
        .post(`${CONFIG.apiUrl}app/wix/token`, {
          instance: queryInstance,
        })
        .then(({ data }) => {
          axios.defaults.headers.common["Authorization"] = data.token;
          EVAPORATE_CONFIG.signHeaders = { Authorization: data.token };
          CONFIG.userType = data.userType;
          CONFIG.subscriptionPlan = data.subscriptionPlan;
          return next(action);
        });
    }
    return next(action);
  };
};

const tokenMiddleware: Middleware = () => {
  return (next: Dispatch<AnyAction>) =>
    (action: AnyAction | ((...args: unknown[]) => unknown)) => {
      if (!axios.defaults.headers.common["Authorization"]) {
        const token = getCookie("id_token");
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      }

      return typeof action === "function"
        ? action(store.dispatch, store.getState)
        : next(action);
    };
};

const rootReducer = combineReducers({
  images: imagesReducer,
  tours: toursReducer,
  notifications: notificationsReducer,
  viewer: viewerReducer,
  widget: widgetReducer,
  config: sourceReducer,
});

const middleware = [
  CONFIG.client !== "viarLive" ? tokenMiddleware : getViarTokenMiddleware,
];

const store = configureStore({
  reducer: rootReducer,
  middleware,
});

export default store;
