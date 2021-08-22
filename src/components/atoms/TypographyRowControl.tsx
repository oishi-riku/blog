import { FC } from 'react';
import styles from '@styles/components/atoms/TypographyRowControl.module.scss';

// type Props = {
//   maxRow: number;
//   maxRowPc?: number;
// };

const TypographyRowControl: FC = ({ children }) => {
  return <p className={styles.root}>{children}</p>;
};

export default TypographyRowControl;
