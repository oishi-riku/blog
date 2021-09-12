import { FC } from 'react';
import styles from '@styles/components/atoms/FormTextarea.module.scss';

type Props = {
  id: string;
  label: string;
  row: number;
};

const FormInput: FC<Props> = ({ id, label, row }) => {
  return (
    <div className={styles.root}>
      <label htmlFor={id}>{label}</label>
      <textarea id={id} rows={row} />
    </div>
  );
};

export default FormInput;
