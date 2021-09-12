import * as yup from 'yup';
import { localeJP } from '@validation/config/locale';

yup.setLocale(localeJP);

export type Input = {
  title: string;
  name: string;
  content: string;
  next: string;
};

export const scheme = yup.object().shape({
  title: yup.string().required(),
  content: yup.string().required(),
  next: yup.string().required(),
});
