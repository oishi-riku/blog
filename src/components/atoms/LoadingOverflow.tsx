import { Box, CircularProgress } from '@mui/material';
import { FC } from 'react';

type Props = {
  isLoading: boolean;
};

const LoadingOverflow: FC<Props> = ({ isLoading }) => {
  return (
    <>
      {isLoading && (
        <Box
          position="fixed"
          top="0"
          right="0"
          bottom="0"
          left="0"
          zIndex="tooltip"
          display="flex"
          alignItems="center"
          justifyContent="center"
          bgcolor="rgba(0,0,0,0.6)"
        >
          <CircularProgress
            sx={{ color: 'primary.light' }}
            aria-label="ローディング"
          />
        </Box>
      )}
    </>
  );
};

export default LoadingOverflow;
