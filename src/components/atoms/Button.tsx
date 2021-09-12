import { FC } from 'react';
import styles from '@styles/components/atoms/Button.module.scss';

type Props = {
  type: 'button' | 'submit';
  variant: 'outlined' | 'contained';
  color: 'primary' | 'secondary';
  weight?: 'dark' | 'light';
};

const ButtonLink: FC<Props> = ({ children, type, variant, color, weight }) => {
  return (
    <div className={styles.root}>
      <button
        className={styles.link}
        type={type}
        data-variant={variant}
        data-color={color}
        data-weight={weight ? weight : null}
      >
        {children}
      </button>
    </div>
  );
};

export default ButtonLink;
