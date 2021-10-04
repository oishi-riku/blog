import * as yup from 'yup';
import { localeJP } from 'validation/config/locale';

yup.setLocale(localeJP);

export type Input = {
  name: string;
};

export const scheme = yup.object().shape({
  name: yup
    .string()
    .required()
    .test(
      'is member',
      '入力された名前は登録されていません。',
      (value, context) => {
        if (!value) return false;

        const c = context.options.context as { members: string[] };
        return c.members.includes(value);
      }
    ),
});
