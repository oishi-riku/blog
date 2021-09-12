import { FC } from 'react';
import styles from '@styles/components/atoms/FormTextarea.module.scss';

type Props = {
  id: string;
  label: string;
  value: string;
  row: number;
  helperText?: string;
  isError: boolean;
  handleChange: () => void;
};

const FormInput: FC<Props> = ({
  id,
  label,
  value,
  row,
  helperText,
  isError,
  handleChange,
}) => {
  return (
    <div className={styles.root} data-is-error={isError ? isError : null}>
      <label htmlFor={id}>{label}</label>
      <textarea
        className={styles.textarea}
        id={id}
        value={value}
        rows={row}
        onChange={handleChange}
      />
      {helperText && <p className={styles.helperText}>{helperText}</p>}
    </div>
  );
};

export default FormInput;
