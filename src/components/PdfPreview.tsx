import React, { FC } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Paper, Stack, Typography } from '@mui/material';

type Props = {
  src: string;
  onPdfPreviewClose: () => void;
};

const PdfPreview: FC<Props> = ({ src, onPdfPreviewClose }) => {
  return (
    <Paper data-cy="pdf-preview" elevation={3} sx={{ p: 2, height: '80vh' }}>
      <Stack direction="column" spacing={1} height="100%">
        <Stack direction="row" spacing={1} justifyContent="space-between">
          <Typography variant="h6">PDF preview</Typography>
          <Button
            data-cy="close-pdf-preview-button"
            startIcon={<CloseIcon />}
            onClick={onPdfPreviewClose}
            variant="outlined"
          >
            Close
          </Button>
        </Stack>
        <iframe
          src={src}
          title="PDF preview"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </Stack>
    </Paper>
  );
};

export default PdfPreview;
