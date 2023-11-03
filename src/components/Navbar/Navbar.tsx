import React, { MouseEvent, useState } from 'react';
import styled from '@emotion/styled';
import PersonIcon from '@mui/icons-material/Person';
import {
  AppBar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography
} from '@mui/material';
import { useAuth } from '../../hooks/useAuth';
import theme from '../../themes/theme';
import { APP_NAME } from '../../utils/constants';

const StyledAppBar = styled(AppBar)(() => ({
  backgroundColor: theme.palette.secondary.main,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingRight: '40px',
  position: 'fixed',
  margin: '0px',
  zIndex: 1000
}));

export const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const auth = useAuth();

  const handleProfileMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const accountMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      sx={{ marginTop: '40px' }}
    >
      <MenuItem data-cy="log-out-button" onClick={auth.logout}>
        Log out
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyledAppBar position="static">
        <Toolbar>
          <IconButton>
            <Typography color={'white'} variant="h5">
              {APP_NAME}
            </Typography>
          </IconButton>
        </Toolbar>
        {auth?.user && (
          <IconButton
            data-cy="account-button"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <Stack direction={'row'} spacing={1} sx={{ alignItems: 'end' }}>
              <PersonIcon sx={{ fontSize: '35px' }} />
              <Typography color={'white'} variant="h5">
                Account
              </Typography>
            </Stack>
          </IconButton>
        )}
      </StyledAppBar>
      {accountMenu}
    </Box>
  );
};
