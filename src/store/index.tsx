import axios from "axios";
import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  Middleware,
} from "redux";
import thunkMiddleware from "redux-thunk";

import notificationsReducer from "./notifications/reducer";
import imagesReducer from "./images/reducer";
import viewerReducer from "./viewer/reducer";
import widgetReducer from "./widget/reducer";
import toursReducer from "./tours/reducer";

import { CONFIG, EVAPORATE_CONFIG } from "../utils/config";

axios.defaults.baseURL = CONFIG.apiUrl;

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const getViarTokenMiddleware: Middleware = () => {
  return (next) => (action: AnyAction) => {
    if (!axios.defaults.headers.common["Authorization"]) {
      // const params = new URL(document.location as any)?.searchParams;
      // const queryInstance = params.get('instance');
      const queryInstance =
        "wmXORSNgtAd5stGu8WUWkKHgeU6jIbIS--dKpxReU5o.eyJpbnN0YW5jZUlkIjoiZWI4NjAxOWQtZjcxYS00MWNiLWE0YmYtYjQ4NTEyMWM5NWM4IiwiYXBwRGVmSWQiOiIxNDk2NDNlNS1jNTYxLTU3ODMtYTE1YS00MTY4MWRkNzMyOTAiLCJzaWduRGF0ZSI6IjIwMjItMTItMjhUMDk6NTI6MzcuMzkxWiIsInVpZCI6IjQxNjU2NTI5LWU5NDgtNDc5OC1iNTcwLWI2YjE2M2JiNDVkMCIsInBlcm1pc3Npb25zIjoiT1dORVIiLCJkZW1vTW9kZSI6ZmFsc2UsInNpdGVPd25lcklkIjoiNDE2NTY1MjktZTk0OC00Nzk4LWI1NzAtYjZiMTYzYmI0NWQwIiwic2l0ZU1lbWJlcklkIjoiNDE2NTY1MjktZTk0OC00Nzk4LWI1NzAtYjZiMTYzYmI0NWQwIiwiZXhwaXJhdGlvbkRhdGUiOiIyMDIyLTEyLTI4VDEzOjUyOjM3LjM5MVoiLCJsb2dpbkFjY291bnRJZCI6IjQxNjU2NTI5LWU5NDgtNDc5OC1iNTcwLWI2YjE2M2JiNDVkMCIsInBhaSI6bnVsbCwibHBhaSI6bnVsbH0";

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

const enhancers = composeEnhancers(
  applyMiddleware(getViarTokenMiddleware, thunkMiddleware)
);

const rootReducer = combineReducers({
  images: imagesReducer,
  tours: toursReducer,
  notifications: notificationsReducer,
  viewer: viewerReducer,
  widget: widgetReducer,
});

const store = createStore(rootReducer, undefined, enhancers);

export default store;
