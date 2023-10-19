import React from 'react';
import { Stack } from '@mui/material';
import { Chatbot } from '../components/Chatbot/Chatbot';
import { CenterPageContent } from '../components/Layout/CenterPageContent';
import { Navbar } from '../components/Navbar/Navbar';
import { PDFDisplay } from '../components/PDFDisplay/PDFDisplay';
import { MessageBubbleProps, Source } from '../types/conversationTypes';

export const PdfPage = () => {
    const chosenSource = {
        isin: "isn121",
        shortname: "reflection_report",
        link: "http://localhost:3000/reflection_report.pdf",
        page: 2,
      };
      const [showPdf, setShowPdf] = React.useState(true);
    return (
    <>
      <Navbar />
        <CenterPageContent>
          {showPdf && <PDFDisplay close={() => console.log("close")} pdfUrl={chosenSource.link} initialPage={chosenSource.page}/>}
        </CenterPageContent>
    </>
  );
};

export default PdfPage;