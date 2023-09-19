import styled from '@emotion/styled';
import { Container } from '@mui/material';

export const Column = styled(Container)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  margin: '2px',
  alignItems: 'space-between',
  width: '100%',
  height: '100%'
}));
