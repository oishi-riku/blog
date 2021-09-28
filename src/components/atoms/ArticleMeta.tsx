import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import filterDate from 'helper/filterDate';

type Props = {
  date: Date;
  name?: string;
};

const ArticleMeta: FC<Props> = ({ date, name }) => {
  return (
    <Box display="flex" gap={1}>
      <Typography component="time" fontSize="body2.fontSize" color="primary">
        {filterDate({ date, withTime: true })}
      </Typography>
      <Typography component="span" fontSize="body2.fontSize" color="primary">
        {name}
      </Typography>
    </Box>
  );
};

export default ArticleMeta;
