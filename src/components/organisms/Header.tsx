import { Home } from '@mui/icons-material';
import {
  AppBar,
  Container,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useState, useContext, MouseEvent } from 'react';
import { StoreContext } from 'hooks/useStore';

type Props = {
  name: string;
  anchorEl: HTMLElement | null;
  isMenuOpen: boolean;
  handleClickMenuBtn: (event: MouseEvent<HTMLButtonElement>) => void;
  handleCloseMenu: () => void;
  handleMoveSetting: () => void;
  handleLogout: () => void;
};

const Header: FC<Props> = ({
  name,
  anchorEl,
  isMenuOpen,
  handleClickMenuBtn,
  handleCloseMenu,
  handleMoveSetting,
  handleLogout,
}) => {
  const menuId = 'global-menu';

  return (
    <AppBar position="sticky">
      <Container>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          py={0.5}
          minHeight={44}
        >
          <Box>
            <Link href="/" passHref>
              <IconButton
                sx={{ color: 'common.white' }}
                aria-label="トップページ"
              >
                <Home />
              </IconButton>
            </Link>
          </Box>
          <Box>
            <Button
              sx={{ color: 'common.white' }}
              onClick={handleClickMenuBtn}
              aria-controls={menuId}
              aria-expanded={isMenuOpen}
            >
              {name}
            </Button>
          </Box>
        </Box>
        <Menu
          id={menuId}
          open={isMenuOpen}
          anchorEl={anchorEl}
          onClose={handleCloseMenu}
        >
          <MenuItem onClick={handleMoveSetting}>設定</MenuItem>
          <MenuItem onClick={handleLogout}>ログアウト</MenuItem>
        </Menu>
      </Container>
    </AppBar>
  );
};

const EnhancedHeader: FC = () => {
  const router = useRouter();
  const { store, storeDispatch } = useContext(StoreContext);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const isMenuOpen = !!anchorEl;

  const handleClickMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleMoveSetting = () => {
    router.push({ pathname: '/setting', query: { next: location.pathname } });
    handleCloseMenu();
  };
  const handleLogout = () => {
    localStorage.removeItem('MEMBER_NAME');
    storeDispatch({ type: 'UPDATE', payload: { name: 'member', value: null } });
    router.push('/login');
  };

  return (
    <Header
      name={store.member?.dispName ?? ''}
      anchorEl={anchorEl}
      isMenuOpen={isMenuOpen}
      handleClickMenuBtn={handleClickMenu}
      handleCloseMenu={handleCloseMenu}
      handleMoveSetting={handleMoveSetting}
      handleLogout={handleLogout}
    />
  );
};

export default EnhancedHeader;
