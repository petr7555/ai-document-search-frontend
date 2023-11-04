import React, { useState } from 'react';
import { Box, Stack } from '@mui/material';
import Chatbot from '../components/Chat/Chatbot';
import PdfPreview from '../components/PdfPreview';
import usePageTitle from '../hooks/usePageTitle';

export const ChatPage = () => {
  usePageTitle('Chat');

  const [pdfPreviewSrc, setPdfPreviewSrc] = useState('');

  const handlePdfPreviewSrcChanged = (src: string) => {
    setPdfPreviewSrc(src);
  };

  const handlePdfPreviewClosed = () => {
    setPdfPreviewSrc('');
  };

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{ width: '100%', height: '80vh', justifyContent: 'center' }}
    >
      <Box sx={{ flex: 1, maxWidth: '60vw' }}>
        <Chatbot onPdfPreviewSrcChanged={handlePdfPreviewSrcChanged} />
      </Box>
      {pdfPreviewSrc && (
        <Box sx={{ flex: 1 }}>
          <PdfPreview
            src={pdfPreviewSrc}
            onPdfPreviewClose={handlePdfPreviewClosed}
          />
        </Box>
      )}
    </Stack>
  );
};
