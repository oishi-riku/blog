import { FC, useContext } from 'react';
import { AppBar, Container, Box, Button } from '@mui/material';
import { MemberContext } from 'context/context';

const Header: FC<{ name: string }> = ({ name }) => {
  return (
    <AppBar position="sticky">
      <Container>
        <Box display="flex" justifyContent="flex-end" py={0.5} minHeight={44}>
          <Button sx={{ color: 'common.white' }}>{name}</Button>
        </Box>
      </Container>
    </AppBar>
  );
};

const EnhancedHeader: FC = () => {
  const member = useContext(MemberContext);

  return <Header name={member?.dispName ?? ''} />;
};

export default EnhancedHeader;
