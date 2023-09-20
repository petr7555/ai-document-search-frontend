import styled from '@emotion/styled';
import PersonIcon from '@mui/icons-material/Person';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import theme from '../themes/theme';
import { Row } from './Row';

const StyledAppBar = styled(AppBar)(() => ({
  backgroundColor: theme.palette.secondary.main,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingRight: '40px',
  position: 'fixed',
  margin: '0px'
}));

export const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyledAppBar position="static">
        <Toolbar>
          <IconButton>
            <Typography color={'white'} variant="h5">
              Stamdata
            </Typography>
          </IconButton>
        </Toolbar>
        <IconButton color="inherit">
          <Row sx={{ gap: '10px' }}>
            <PersonIcon sx={{ fontSize: '35px' }} />
            <Typography color={'white'} variant="h5">
              Account
            </Typography>
          </Row>
        </IconButton>
      </StyledAppBar>
    </Box>
  );
};
