import { FC, useState, useContext, MouseEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  AppBar,
  Container,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import { Home } from '@mui/icons-material';
import { MemberContext } from 'hooks/useMemberStore';

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
  const context = useContext(MemberContext);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const isMenuOpen = !!anchorEl;

  const handleClickMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleMoveSetting = () => {
    const currentPath = router.pathname;
    router.push({ pathname: '/setting', query: { next: currentPath } });
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
      handleMoveSetting={handleMoveSetting}
      handleLogout={handleLogout}
    />
  );
};

export default EnhancedHeader;
