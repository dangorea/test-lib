import type { RootState } from "../types";
import type { SUBSCRIPTION_PLAN } from "../../utils/types";

export const getSource =
  () =>
  (state: RootState): string =>
    state.config.source;

export const getOnClose =
  () =>
  (state: RootState): (() => void) =>
    state.config.onClose;

export const getUserConfig =
  () =>
  (state: RootState): SUBSCRIPTION_PLAN =>
    state.config.userConfig;
