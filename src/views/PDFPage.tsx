import React from 'react';
import { Navbar } from '../components/Navbar/Navbar';
import  { PDFDisplay } from '../components/PDFDisplay/PDFDisplay';
import { CenterPageContent } from '../components/CenterPageContent';
import { Chatbot } from '../components/Chatbot/Chatbot';
import { Stack,} from '@mui/material';

export const PDFPage = () => {
  const [showPDF, setShowPDF] = React.useState(false);
  const url = "PDF URL WEEWOO"
  
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
          {showPDF ? <PDFDisplay close={() => {setShowPDF(false)}} pdfUrl='http://localhost:3000/reflection_report.pdf' initialPage={1} /> : null}
      </Stack>
    </>
  );
};

