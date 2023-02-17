import * as yup from 'yup';
import { TMP_HOTSPOT_NAME } from '../constants';

export type Values = {
  id: string;
  title: string;
  content: string;
  icon: string;
  color: string;
  width: string;
  height: string;
  size: string;
  target: string;
};

export const FLAT_ICON_NAMES = ['flat'];

export const initialValues = {
  id: TMP_HOTSPOT_NAME,
  title: '',
  content: '',
  target: '',
  icon: FLAT_ICON_NAMES[0],
  color: '#ffffff',
  width: '',
  height: '',
  size: '0.26',
};

export const validationSchema = yup.object().shape({
  title: yup.string().required('Required'),
  target: yup.string().required('Required'),
  icon: yup.string().required('Required'),
  color: yup.string().required('Required'),
});
