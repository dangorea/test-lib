import { createRequestTypes } from '../utils';

const c: { [action: string]: string } = {
  UPDATE_FONTS: 'UPDATE_FONTS',
  ...createRequestTypes('GET_WIDGET_SETTINGS'),
  ...createRequestTypes('UPDATE_WIDGET_SETTINGS'),
};

export default c;
