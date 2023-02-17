import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const SOURCE_REDUCER = "source";

type InitialState = {
  source: string;
  bucket: string;
};

const initialState: InitialState = {
  source: "",
  bucket: "",
};

const authSlice = createSlice({
  name: SOURCE_REDUCER,
  initialState,
  reducers: {
    setSource(state, { payload }: PayloadAction<string>) {
      state.source = payload;
      state.bucket =
        payload === "viarLive"
          ? "static.a.viar.live"
          : "test.static.a.viar.live";
    },
  },
});

export const { setSource } = authSlice.actions;
export default authSlice.reducer;
