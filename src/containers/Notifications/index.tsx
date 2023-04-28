import React, { FC } from "react";
import { useSelector } from "react-redux";
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

  return (
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
      ))}
    </NotificationsWrapper>
  );
};

export default Notifications;
