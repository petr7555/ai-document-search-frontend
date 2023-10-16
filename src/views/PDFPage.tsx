import React from 'react';
import { CenterPageContent } from '../components/CenterPageContent';
import { Navbar } from '../components/Navbar/Navbar';
import  { PDFDisplay } from '../components/PDFDisplay/PDFDisplay';
import { Chatbot } from '../components/Chatbot/Chatbot';
import { Stack, Grid, Box } from '@mui/material';
import { flexbox } from '@mui/system';

import ReactDOM from 'react-dom';


export const PDFPage = () => {
  const [showPDF, setShowPDF] = React.useState(false);

  return (
    <>
      {/*<Navbar />*/}
      <button onClick={() => setShowPDF(true)}> Show PDF </button>
      <Stack spacing={2}
        direction="row"
        alignItems={'center'}
        justifyContent={'center'}
        sx={{width: '100vw', height:'100%'}}>
        <CenterPageContent>
          <Chatbot showPDF={() => {setShowPDF(true)}} />
        </CenterPageContent>
          { showPDF ? <PDFDisplay close={() => {setShowPDF(false)}} /> : null }
      </Stack>
    </>
  );
};

