import styled from '@emotion/styled';
import { Container } from '@mui/material';

export const CenterPageContent = styled(Container)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  width: '100vw',
  flex: 1
}));
