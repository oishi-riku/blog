import { FC } from 'react';
import styles from '@styles/components/atoms/TypographyRowControl.module.scss';

type Props = {
  maxRow: 1 | 2 | 3 | 4 | 5;
  maxRowPc?: 1 | 2 | 3 | 4 | 5;
};

const TypographyRowControl: FC<Props> = ({ children, maxRow, maxRowPc }) => {
  return (
    <p
      className={styles.root}
      data-row={maxRow}
      data-row-pc={maxRowPc ? maxRowPc : null}
    >
      {children}
    </p>
  );
};

export default TypographyRowControl;
