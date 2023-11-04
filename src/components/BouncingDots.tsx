import React from 'react';
import Box from '@mui/material/Box';

const BouncingDots = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      sx={{
        '> div': {
          width: '8px',
          height: '8px',
          margin: '10px 4px 5px 4px',
          borderRadius: '50%',
          backgroundColor: 'primary.main',
          opacity: 1,
          animation: 'bouncing-loader 0.5s infinite alternate',
          '@keyframes bouncing-loader': {
            to: {
              opacity: 0.1,
              transform: 'translateY(-10px)'
            }
          },
          '&:nth-of-type(2)': {
            animationDelay: '0.2s'
          },
          '&:nth-of-type(3)': {
            animationDelay: '0.4s'
          }
        }
      }}
    >
      <div />
      <div />
      <div />
    </Box>
  );
};

export default BouncingDots;
