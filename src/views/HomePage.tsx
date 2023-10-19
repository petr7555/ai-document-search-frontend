import React from 'react';
import { Stack } from '@mui/material';
import { Chatbot } from '../components/Chatbot/Chatbot';
import { CenterPageContent } from '../components/Layout/CenterPageContent';
import { Navbar } from '../components/Navbar/Navbar';

export const HomePage = () => {
  return (
    <>
      <Navbar />
      <Stack
        spacing={2}
        direction="row"
        alignItems={'center'}
        justifyContent={'center'}
        sx={{ width: '100vw', height: '100%' }}
      >
        <CenterPageContent>
          <Chatbot />
        </CenterPageContent>
      </Stack>
    </>
  );
};

export default HomePage;
