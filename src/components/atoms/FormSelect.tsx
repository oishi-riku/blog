import { FC } from 'react';
import styles from '@styles/components/atoms/FormSelect.module.scss';

type Props = {
  id: string;
  label: string;
  value: string;
  helperText?: string;
  isError: boolean;
  options: {
    id: string;
    value: string;
    text: string;
  }[];
  handleChange: () => void;
};

const FormInput: FC<Props> = ({
  id,
  label,
  value,
  helperText,
  isError,
  options,
  handleChange,
}) => {
  return (
    <div className={styles.root} data-is-error={isError ? isError : null}>
      <label htmlFor={id}>{label}</label>
      <select
        className={styles.select}
        id={id}
        value={value}
        onChange={handleChange}
      >
        {options.map((o) => (
          <option key={o.id} value={o.value}>
            {o.text}
          </option>
        ))}
      </select>
      {helperText && <p className={styles.helperText}>{helperText}</p>}
    </div>
  );
};

export default FormInput;
