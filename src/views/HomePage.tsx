import React, { useState } from 'react';
import { CenterPageContent } from '../components/CenterPageContent';
import { Chatbot } from '../components/Chatbot/Chatbot';
import { Navbar } from '../components/Navbar/Navbar';
import  { PDFDisplay } from '../components/PDFDisplay/PDFDisplay';
import { Button, Stack } from '@mui/material';

export const HomePage = () => {
  const [showPDF, setShowPDF] = useState<boolean>(false);

  const handleDisplayPDF = () => {
    setShowPDF(true);
  }

  const handleHidePDF = () => {
    setShowPDF(false)
  }

  return (
    <>
      <Navbar />
      <Stack spacing={2}
        direction="row"
        alignItems={'center'}
        justifyContent={'center'}
        sx={{width: '100vw', height:'100%'}}>
          <CenterPageContent>
        <Chatbot showPDF={handleDisplayPDF}/>
        </CenterPageContent>
        {/* <PDFDisplay /> */}
        {showPDF && (
          <PDFDisplay close={handleHidePDF}/>
        )}
      </Stack>
    </>
  );
};

export default HomePage;
