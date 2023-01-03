import type { NotificationTypes } from './constants';

export type INotification = {
  id: string;
  type: NotificationTypes;
  msg?: string;
};

export type State = {
  data: INotification[];
};
