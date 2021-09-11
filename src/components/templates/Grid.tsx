import { FC, ReactNode } from 'react';
import styles from '@styles/components/templates/Grid.module.scss';

type Props = {
  items: { id: string; item: ReactNode }[];
  col: 1 | 2 | 3 | 4;
  colPc?: 1 | 2 | 3 | 4;
};

const Grid: FC<Props> = ({ items, col, colPc }) => {
  return (
    <ul
      className={styles.root}
      data-col={col}
      data-col-pc={colPc ? colPc : null}
    >
      {items.map((i) => (
        <li key={i.id}>{i.item}</li>
      ))}
    </ul>
  );
};

export default Grid;
