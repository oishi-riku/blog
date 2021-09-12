import { FC } from 'react';
import styles from '@styles/components/atoms/FormInput.module.scss';

type Props = {
  id: string;
  label: string;
  value: string;
  type: 'text' | 'password';
  helperText?: string;
  isError: boolean;
  handleChange: () => void;
};

const FormInput: FC<Props> = ({
  id,
  label,
  value,
  type,
  helperText,
  isError,
  handleChange,
}) => {
  return (
    <div className={styles.root} data-is-error={isError ? isError : null}>
      <label htmlFor={id}>{label}</label>
      <input
        className={styles.input}
        type={type}
        id={id}
        value={value}
        onChange={handleChange}
      />
      {helperText && <p className={styles.helperText}>{helperText}</p>}
    </div>
  );
};

export default FormInput;
