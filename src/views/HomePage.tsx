import React, { useState } from 'react';
import { Chatbot } from '../components/Chatbot/Chatbot';
import { CenterPageContent } from '../components/Layout/CenterPageContent';
import { Navbar } from '../components/Navbar/Navbar';
import  { PDFDisplay } from '../components/PDFDisplay/PDFDisplay';
import { Button, Stack } from '@mui/material';

export const HomePage = () => {
  const [showPDF, setShowPDF] = useState<boolean>(false);
  const [pdfUrl, setPdfUrl] = useState('http://localhost:3000/reflection_report.pdf');
  const [initialPage, setInitialPage] = useState(1);

  const handleDisplayPDF = (pdfUrl: string, initialPage: number) => {
    setShowPDF(true);
    setPdfUrl(pdfUrl);
    setInitialPage(initialPage);
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
        { showPDF && (
          <PDFDisplay close={handleHidePDF} pdfUrl={pdfUrl} initialPage={initialPage}/>
        )}
      </Stack>
    </>
  );
};

export default HomePage;
