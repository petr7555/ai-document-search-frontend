import styled from '@emotion/styled';
import { Container } from '@mui/material';
import theme from '../themes/theme';

export const CenterPageContent = styled(Container)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  width: '100vw',
  flexGrow: 1,
  backgroundColor: theme.palette.info.main
}));
