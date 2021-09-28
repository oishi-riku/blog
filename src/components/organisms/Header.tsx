import { FC, useState, useContext, MouseEvent } from 'react';
import { useRouter } from 'next/router';
import { AppBar, Container, Box, Button, Menu, MenuItem } from '@mui/material';
import { MemberContext } from 'hooks/useMemberStore';

type Props = {
  name: string;
  anchorEl: HTMLElement | null;
  isMenuOpen: boolean;
  handleClickMenuBtn: (event: MouseEvent<HTMLButtonElement>) => void;
  handleCloseMenu: () => void;
  handleLogout: () => void;
};

const Header: FC<Props> = ({
  name,
  anchorEl,
  isMenuOpen,
  handleClickMenuBtn,
  handleCloseMenu,
  handleLogout,
}) => {
  const menuId = 'global-menu';
  return (
    <AppBar position="sticky">
      <Container>
        <Box display="flex" justifyContent="flex-end" py={0.5} minHeight={44}>
          <Button
            sx={{ color: 'common.white' }}
            onClick={handleClickMenuBtn}
            aria-controls={menuId}
            aria-expanded={isMenuOpen}
          >
            {name}
          </Button>
        </Box>
        <Menu
          id={menuId}
          open={isMenuOpen}
          anchorEl={anchorEl}
          onClose={handleCloseMenu}
        >
          <MenuItem>表示名変更</MenuItem>
          <MenuItem onClick={handleLogout}>ログアウト</MenuItem>
        </Menu>
      </Container>
    </AppBar>
  );
};

const EnhancedHeader: FC = () => {
  const router = useRouter();
  const context = useContext(MemberContext);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const isMenuOpen = !!anchorEl;

  const handleClickMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    localStorage.removeItem('MEMBER_NAME');
    context?.memberDispatch({ type: 'DELETE', member: null });
    router.push('/login');
  };

  return (
    <Header
      name={context?.member?.dispName ?? ''}
      anchorEl={anchorEl}
      isMenuOpen={isMenuOpen}
      handleClickMenuBtn={handleClickMenu}
      handleCloseMenu={handleCloseMenu}
      handleLogout={handleLogout}
    />
  );
};

export default EnhancedHeader;
