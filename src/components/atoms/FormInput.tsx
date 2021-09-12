import { FC } from 'react';
import styles from '@styles/components/atoms/FormInput.module.scss';

type Props = {
  id: string;
  label: string;
  type: 'text' | 'password';
};

const FormInput: FC<Props> = ({ id, label, type }) => {
  return (
    <div className={styles.root}>
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} />
    </div>
  );
};

export default FormInput;
