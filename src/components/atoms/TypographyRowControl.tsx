import { FC } from 'react';
import { Typography, Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

type Props = {
  maxRow: 1 | 2 | 3 | 4 | 5;
  maxRowPc?: 1 | 2 | 3 | 4 | 5;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: (props: Props) => ({
      whiteSpace: 'pre-line',
      display: '-webkit-box',
      overflow: 'hidden',
      '-webkit-box-orient': 'vertical',
      '-webkit-line-clamp': props.maxRow,
      [theme.breakpoints.up('sm')]: {
        '-webkit-line-clamp': props.maxRowPc,
      },
    }),
  })
);

const TypographyRowControl: FC<Props> = ({ children, maxRow, maxRowPc }) => {
  const styles = useStyles({ maxRow, maxRowPc });
  return <Typography className={styles.root}>{children}</Typography>;
};

export default TypographyRowControl;
