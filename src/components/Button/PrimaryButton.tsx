import styled from '@emotion/styled';
import { Button, ButtonProps } from '@mui/material';
import theme from '../../themes/theme';

export const PrimaryButton = styled(Button)<ButtonProps>(() => ({
  backgroundColor: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark
  }
}));
