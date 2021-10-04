import * as yup from 'yup';
import { localeJP } from 'validation/config/locale';

yup.setLocale(localeJP);

export type Input = {
  name: string;
  dispName: string;
};

export const scheme = yup.object().shape({
  dispName: yup.string().required(),
});
