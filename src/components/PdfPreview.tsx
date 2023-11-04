import React, { FC } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Stack } from '@mui/material';

type Props = {
  src: string;
  onPdfPreviewClose: () => void;
};

const PdfPreview: FC<Props> = ({ src, onPdfPreviewClose }) => {
  return (
    <Stack
      data-cy="pdf-preview"
      direction="column"
      spacing={1}
      height="100%"
      alignItems="flex-end"
    >
      <Button
        data-cy="close-pdf-preview-button"
        startIcon={<CloseIcon />}
        onClick={onPdfPreviewClose}
        variant="outlined"
      >
        Close
      </Button>
      <iframe
        src={src}
        title="PDF preview"
        frameBorder="0"
        width="100%"
        height="100%"
      />
    </Stack>
  );
};

export default PdfPreview;
