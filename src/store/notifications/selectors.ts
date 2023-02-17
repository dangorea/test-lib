import type { RootState } from "../types";
import type { INotification } from "./types";

export const getNotifications =
  () =>
  (state: RootState): INotification[] =>
    state.notifications.data;
