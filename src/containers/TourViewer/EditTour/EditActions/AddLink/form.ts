import * as yup from 'yup';
import { TMP_HOTSPOT_NAME } from '../constants';

export type Values = {
  id: string;
  title: string;
  url: string;
  icon: string;
  color: string;
  size: string;
};

export const LINK_ICON_NAMES = [
  'link',
  'link-1',
  'link-2',
  'link-6',
  'link-5',
  'link-7',
  'link-3',
];

export const initialValues = {
  id: TMP_HOTSPOT_NAME,
  title: '',
  url: '',
  icon: LINK_ICON_NAMES[0],
  color: '#ffffff',
  size: '0.26',
};

const checkUrl =
  /^(?:https:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/gim;

export const validationSchema = yup.object().shape({
  title: yup.string().required('Required'),
  url: yup
    .string()
    .required('Required')
    .matches(checkUrl, 'Should be valid url'),
  icon: yup.string().required('Required'),
  color: yup.string().required('Required'),
});
