import React, { FC } from 'react';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import useAuth from '../hooks/useAuth';
import { APP_NAME } from '../utils/constants';

const NavigationBar: FC = () => {
  const auth = useAuth();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" color="secondary">
        <Toolbar>
          <Typography variant="h5" sx={{ flexGrow: 1 }}>
            {APP_NAME}
          </Typography>
          {auth.token && (
            <Button
              data-cy="logout-button"
              color="inherit"
              variant="outlined"
              onClick={auth.logOut}
            >
              Log out
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavigationBar;
