import { FC } from 'react';
import { AppBar, Container, Box, Button } from '@mui/material';

const Header: FC = () => {
  return (
    <AppBar position="sticky">
      <Container>
        <Box display="flex" py={0.5} justifyContent="flex-end">
          <Button sx={{ color: 'common.white' }}>大石陸</Button>
        </Box>
      </Container>
    </AppBar>
  );
};

export default Header;
