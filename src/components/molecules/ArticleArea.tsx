import { Typography } from '@mui/material';
import { FC } from 'react';

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
