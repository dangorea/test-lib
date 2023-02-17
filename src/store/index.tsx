import type { AnyAction, compose, Middleware } from "redux";
import {
  // Action,
  combineReducers,
  configureStore,
  // getDefaultMiddleware,
  // ThunkAction,
} from "@reduxjs/toolkit";
import toursReducer from "./tours/reducer";
import imagesReducer from "./images/reducer";
import notificationsReducer from "./notifications/reducer";
import viewerReducer from "./viewer/reducer";
import widgetReducer from "./widget/reducer";
import sourceReducer from "./test/reducer";
import { getCookie } from "cookies-next";
import axios from "axios";
import { CONFIG, EVAPORATE_CONFIG } from "../utils/config";
import type { Dispatch } from "react";
// import { createWrapper } from "next-redux-wrapper";
// import { CONFIG, EVAPORATE_CONFIG } from "../utils/config";
// import thunk from "redux-thunk";

// axios.defaults.baseURL = CONFIG.apiUrl;

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const getViarTokenMiddleware: Middleware = () => {
  return (next) => (action: AnyAction) => {
    if (!axios.defaults.headers.common["Authorization"]) {
      // const params = new URL(document.location as any)?.searchParams;
      // const queryInstance = params.get("instance");
      const queryInstance =
        "gfvtDLHTFarGBd_XmFYxWPQAqCCo2jYxCQQVA0N3PUo.eyJpbnN0YW5jZUlkIjoiZTVjYjM5ZWMtMTU5YS00YWZmLWJiMDktOWNjMGY1ODhmMjMzIiwiYXBwRGVmSWQiOiIxNDk2NDNlNS1jNTYxLTU3ODMtYTE1YS00MTY4MWRkNzMyOTAiLCJzaWduRGF0ZSI6IjIwMjMtMDItMDhUMTM6NTU6MTguMDUxWiIsInVpZCI6IjQxNjU2NTI5LWU5NDgtNDc5OC1iNTcwLWI2YjE2M2JiNDVkMCIsInBlcm1pc3Npb25zIjoiT1dORVIiLCJkZW1vTW9kZSI6ZmFsc2UsInNpdGVPd25lcklkIjoiZjE4OTk0OTktNzVhYi00ODYzLWJlZDMtZDM1M2Y3YjI5ZGZmIiwic2l0ZU1lbWJlcklkIjoiYzE4OTE0ZjEtMTRkZi00OWQ1LWE4MGItNDAxYzU0MzljNDc0IiwiZXhwaXJhdGlvbkRhdGUiOiIyMDIzLTAyLTA4VDE3OjU1OjE4LjA1MVoiLCJsb2dpbkFjY291bnRJZCI6IjQxNjU2NTI5LWU5NDgtNDc5OC1iNTcwLWI2YjE2M2JiNDVkMCIsImxwYWkiOm51bGx9";

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
        EVAPORATE_CONFIG.signHeaders = { Authorization: `Bearer ${token}` };
        // CONFIG.userType = {get userType somehow}
        // CONFIG.subscriptionPlan = {get subscriptionPlan somehow}
        // return new Promise(() => {
        //   axios.defaults.headers.common.Authorization = `${token}`;
        //   EVAPORATE_CONFIG.signHeaders = { Authorization: `${token}` };
        //   // CONFIG.userType = {get userType somehow}
        //   // CONFIG.subscriptionPlan = {get subscriptionPlan somehow}
        //   return next(action);
        // });
      }

      return typeof action === "function"
        ? action(store.dispatch, store.getState)
        : next(action);
    };
};

// const enhancers = composeEnhancers(
//   applyMiddleware(getViarTokenMiddleware, thunkMiddleware)
// );

// const store = createStore(rootReducer, undefined, enhancers);

// export default createWrapper(
//   configureStore({
//     reducer: {
//       // tours: toursSlice.reducer,
//     },
//     // enhancers,
//     // devTools: true,
//   })
// );

// const customizedMiddleware = getDefaultMiddleware({
//   serializableCheck: false,
// });

const rootReducer = combineReducers({
  images: imagesReducer,
  tours: toursReducer,
  notifications: notificationsReducer,
  viewer: viewerReducer,
  widget: widgetReducer,
  config: sourceReducer,
});

// const makeStore = () =>
//   configureStore({
//     reducer: rootReducer,
//     middleware: (getDefaultMiddleware) =>
//       getDefaultMiddleware({
//         serializableCheck: false,
//       }),
//     // enhancers,
//     devTools: true,
//   });

const middleware = [
  // thunk,
  CONFIG.client !== "viarLive" ? tokenMiddleware : getViarTokenMiddleware,
];

// const makeStore = () =>
//   configureStore({
//     reducer: rootReducer,
//     middleware: getDefaultMiddleware({
//       middleware,
//       // serializableCheck: false,
//       serializableCheck: false,
//     }),
//   });
// @ts-ignore
// let msc = 0;
/*
const makeStore = () => {
  console.log("makeStore calls", ++msc);
  const middleware: never[] = applyMiddleware(thunk);
*/

const store = configureStore({
  reducer: rootReducer,
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     thunk: {
  //       thunk,
  //       extraArgument:
  //         CONFIG.client === "wix" ? getViarTokenMiddleware : tokenMiddleware,
  //     },
  //     serializableCheck: false,
  //   }).concat(logger),
  middleware,
});
// };

export default store;

// export type AppStore = ReturnType<any>;
// export type AppState = ReturnType<AppStore["getState"]>;
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   AppState,
//   unknown,
//   Action
// >;
//
// export const wrapper = createWrapper<AppStore>(makeStore);
