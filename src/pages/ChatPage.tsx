import React, { useState } from 'react';
import { Box, Stack } from '@mui/material';
import Chatbot from '../components/Chat/Chatbot';
import PdfPreview from '../components/PdfPreview';
import usePageTitle from '../hooks/usePageTitle';

const ChatPage = () => {
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
      direction={{ xs: 'column', lg: 'row' }}
      spacing={2}
      sx={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}
    >
      <Box sx={{ flex: 1, width: '100%', maxWidth: 900 }}>
        <Chatbot onPdfPreviewSrcChanged={handlePdfPreviewSrcChanged} />
      </Box>
      {pdfPreviewSrc && (
        <Box sx={{ flex: 1, width: '100%' }}>
          <PdfPreview
            src={pdfPreviewSrc}
            onPdfPreviewClose={handlePdfPreviewClosed}
          />
        </Box>
      )}
    </Stack>
  );
};

export default ChatPage;
