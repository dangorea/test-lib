import styled from "styled-components";
import { NotificationTypes } from "../../store/notifications/constants";

export const NotificationsWrapper = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
`;

export const Notification = styled.div<{ type: NotificationTypes }>`
  display: flex;
  align-content: center;
  justify-items: center;
  align-items: center;
  justify-content: center;
  background: ${({ type }) =>
    type === NotificationTypes.success ? "#80c979" : "#FF6D63"};
  width: 100vw;
  height: 4.99vh;
  color: white;

  position: absolute;
  z-index: 90000;
  font-size: 16px;
  font-weight: 530;
  line-height: 24px;
`;

export const NotificationContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    margin-right: 12px;
  }
`;
