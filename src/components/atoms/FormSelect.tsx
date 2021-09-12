import { FC } from 'react';
import styles from '@styles/components/atoms/FormSelect.module.scss';

type Props = {
  id: string;
  label: string;
  options: {
    id: string;
    value: string;
    text: string;
  }[];
};

const FormInput: FC<Props> = ({ id, label, options }) => {
  return (
    <div className={styles.root}>
      <label htmlFor={id}>{label}</label>
      <select name="" id={id}>
        {options.map((o) => (
          <option key={o.id} value={o.value}>
            {o.text}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormInput;
