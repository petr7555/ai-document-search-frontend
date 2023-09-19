import styled from '@emotion/styled';
import { Container } from '@mui/material';

export const Row = styled(Container)(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%'
}));
