import React, { FC, ReactNode } from 'react';
import Box from '@mui/material/Box';

type Props = {
  children: ReactNode;
};
const DividerWithText: FC<Props> = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Box
        sx={{
          borderBottom: '1px solid',
          width: '100%'
        }}
      />
      <Box
        component="span"
        sx={{
          px: 1
        }}
      >
        {children}
      </Box>
      <Box
        sx={{
          borderBottom: '1px solid',
          width: '100%'
        }}
      />
    </Box>
  );
};
export default DividerWithText;
