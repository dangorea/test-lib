import * as yup from 'yup';
import { TMP_HOTSPOT_NAME } from '../constants';

export type Values = {
  id: string;
  title: string;
  content: string;
  icon: string;
  color: string;
  size: string;
};

export const INFO_ICON_NAMES = [
  'info',
  'info-4',
  'info-5',
  'info-3',
  'info-6',
  'info-7',
  'info-1',
  'info-2',
];

export const initialValues = {
  id: TMP_HOTSPOT_NAME,
  title: '',
  content: '',
  icon: INFO_ICON_NAMES[0],
  color: '#ffffff',
  size: '0.26',
};

export const validationSchema = yup.object().shape({
  title: yup.string().required('Required'),
  content: yup.string().required('Required'),
  icon: yup.string().required('Required'),
  color: yup.string().required('Required'),
});
