import { FC } from 'react';
import { Typography } from '@mui/material';

type Props = {
  content: string;
};

const ArticleArea: FC<Props> = ({ content }) => {
  return (
    <Typography
      sx={{
        whiteSpace: 'pre-line',
      }}
    >
      {content}
    </Typography>
  );
};

export default ArticleArea;
