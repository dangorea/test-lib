import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { SUBSCRIPTION_PLAN } from "../../utils/types";
import { USER_TYPES } from "../../utils/config";

export const SOURCE_REDUCER = "source";

type InitialState = {
  source: string;
  bucket: string;
  onClose: () => void;
  userConfig: SUBSCRIPTION_PLAN;
};

const initialState: InitialState = {
  source: "",
  bucket: "",
  onClose: () => {},
  userConfig: {
    id: USER_TYPES.DEFAULT,
    name: "",
    features: [],
    sphereLimitPerTour: 0,
    tourLimit: 0,
  },
};

const configSlice = createSlice({
  name: SOURCE_REDUCER,
  initialState,
  reducers: {
    setSource(state, { payload }: PayloadAction<string>) {
      return {
        ...state,
        source: payload,
        bucket:
          payload === "viarLive"
            ? "static.a.viar.live"
            : "test.static.a.viar.live",
      };
    },
    setOnClose(state, { payload }: PayloadAction<() => void>) {
      return {
        ...state,
        onClose: payload,
      };
    },
    setUserConfig(state, { payload }: PayloadAction<SUBSCRIPTION_PLAN>) {
      return {
        ...state,
        userConfig: payload,
      };
    },
  },
});

export const { setSource, setOnClose, setUserConfig } = configSlice.actions;
export default configSlice.reducer;
