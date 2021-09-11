import { FC } from 'react';
import styles from '@styles/components/atoms/Heading.module.scss';

type Props = {
  level: 1 | 2 | 3 | 4;
  align?: 'center' | 'left' | 'right';
};

const TypographyRowControl: FC<Props> = ({ children, level, align }) => {
  switch (level) {
    case 1:
      return (
        <div className={`${styles.root} ${styles.heading1}`} data-align={align}>
          <h1 className={styles.heading1Text}>{children}</h1>
        </div>
      );
    case 2:
      return (
        <div className={`${styles.root} ${styles.heading2}`} data-align={align}>
          <h2 className={styles.heading2Text}>{children}</h2>
        </div>
      );
    case 3:
      return (
        <div className={`${styles.root} ${styles.heading3}`} data-align={align}>
          <h3 className={styles.heading3Text}>{children}</h3>
        </div>
      );
    case 4:
      return (
        <div className={`${styles.root} ${styles.heading4}`} data-align={align}>
          <h4 className={styles.heading4Text}>{children}</h4>
        </div>
      );
    default:
      return null;
  }
};

export default TypographyRowControl;
