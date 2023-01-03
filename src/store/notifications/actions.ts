import c, { NotificationTypes } from "./constants";
import type { Dispatch } from "redux";
import { v4 } from "uuid";

export const addNotification =
  (type: NotificationTypes, msg: string) =>
  (dispatch: Dispatch): void => {
    const id = v4();

    dispatch({
      type: c.ADD_NOTIFICATION,
      payload: {
        id,
        msg,
        type,
      },
    });

    setTimeout(
      () => dispatch({ type: c.REMOVE_NOTIFICATION, payload: id }),
      1100
    );
  };

export const successNotification = (msg: string): any =>
  addNotification(NotificationTypes.success, msg);

export const errorNotification = (msg: string): any =>
  addNotification(NotificationTypes.error, msg);
