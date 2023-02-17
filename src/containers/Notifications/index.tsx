import React, { FC } from "react";
// import { Notification } from "@wix/design-system";
import { useDispatch, useSelector } from "react-redux";
import { getNotifications } from "../../store/notifications/selectors";
import {
  Notification,
  NotificationContent,
  NotificationsWrapper,
} from "./styles";
import success from "../../assets/icons/saveIcon.svg";
import error from "../../assets/icons/errorIcon.svg";
import { NotificationTypes } from "../../store/notifications/constants";

const Notifications: FC = () => {
  const notifications = useSelector(getNotifications());
  const dispatch = useDispatch();

  // TODO Fix here

  return (
    //   TODO Fix here
    <NotificationsWrapper>
      {notifications.map(({ msg, type, id }) => (
        <Notification key={id} type={type}>
          <NotificationContent>
            <img
              src={type === NotificationTypes.success ? success : error}
              alt=""
            />
            {msg}
          </NotificationContent>
        </Notification>
        // <Notification
        //   theme={type}
        //   show
        //   autoHideTimeout={1000}
        //   zIndex={1000}
        //   onClose={() => dispatch({ type: TOUR_CONSTANTS.REMOVE_NOTIFICATION, payload: id })}
        //   key={id}
        // >
        //   <Notification.TextLabel>{msg}</Notification.TextLabel>
        //   <Notification.CloseButton />
        // </Notification>
      ))}
    </NotificationsWrapper>
  );
};

export default Notifications;
