import { FC } from 'react';
import styles from '@styles/components/atoms/Box.module.scss';

type Props = {
  display?: 'flex' | 'block' | 'inline' | 'inline-block';
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  align?: 'top' | 'center' | 'bottom';
  justify?: 'left' | 'center' | 'right';
  m?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  mt?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  mr?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  mb?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  ml?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  p?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  pt?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  pr?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  pb?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  pl?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
};

const ButtonLink: FC<Props> = ({
  children,
  display,
  direction,
  align,
  justify,
  m,
  mt,
  mr,
  mb,
  ml,
  p,
  pt,
  pr,
  pb,
  pl,
}) => {
  return (
    <div
      className={styles.root}
      data-display={display ? display : null}
      data-direction={direction ? direction : null}
      data-align={align ? align : null}
      data-justify={justify ? justify : null}
      data-m={m ? m : null}
      data-mt={mt ? mt : null}
      data-mr={mr ? mr : null}
      data-mb={mb ? mb : null}
      data-ml={ml ? ml : null}
      data-p={p ? p : null}
      data-pt={pt ? pt : null}
      data-pr={pr ? pr : null}
      data-pb={pb ? pb : null}
      data-pl={pl ? pl : null}
    >
      {children}
    </div>
  );
};

export default ButtonLink;
