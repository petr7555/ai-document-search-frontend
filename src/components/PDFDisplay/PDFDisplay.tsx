import React, { ChangeEvent, useCallback, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import styled from '@emotion/styled';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import RemoveIcon from '@mui/icons-material/Remove';
import {
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { TextItem } from 'pdfjs-dist/types/src/display/api';
import theme from '../../themes/theme';
import { Source } from '../../types/conversationTypes';
import { CustomNumberInput } from './CustomNumberInput';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString();

function highlightPattern(text: string, pattern: string) {
  return text.replace(
    new RegExp(pattern, 'i'),
    (value) => `<mark>${value}</mark>`
  );
}
interface PDFDisplayProps {
  source: Source;
  setShowPDF: React.Dispatch<React.SetStateAction<boolean>>;
}

const StyledPDFDisplay = styled(Stack)(() => ({
  width: '100%',
  height: '100%',
  margin: 'auto',
  backgroundColor: '#3d3d3d',
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  justifyContent: 'center'
}));

const StyledIconButton = styled(IconButton)(() => ({
  color: `${theme.palette.secondary.light}`,
  backgroundColor: 'white',
  borderRadius: '100%',
  padding: '5px',
  '&:hover': {
    backgroundColor: '#cecece'
  }
}));

export function PDFDisplay({ source, setShowPDF }: PDFDisplayProps) {
  //const [loading, setLoading] = useState(true);
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState<number | undefined>(source.page);
  const [zoomLevel, setZoomLevel] = useState(1.0);
  const [searchText, setSearchText] = useState('');

  const ZOOMRATE = 1.5;

  const NumberInputBasic = () => {
    return (
      <CustomNumberInput
        data-cy= "number-input-component"
        placeholder="…"
        value={pageNumber}
        onChange={(event, val) => {
          if (val == null) {
            setPageNumber(source.page);
          } else if (val > numPages) {
            setPageNumber(numPages);
          } else if (val < 1) {
            setPageNumber(1);
          } else {
            setPageNumber(val);
          }
        }}
      />
    );
  };

  function onDocumentLoadSuccess({
    numPages
  }: {
    numPages: number | undefined;
  }) {
    if (numPages != null) {
      setNumPages(numPages);
    }
  }

  const textRenderer = useCallback(
    (textItem: TextItem) => highlightPattern(textItem.str, searchText),
    [searchText]
  );

  function increaseZoom() {
    setZoomLevel(zoomLevel * ZOOMRATE);
  }

  function decreaseZoom() {
    setZoomLevel(zoomLevel / ZOOMRATE);
  }

  return (
    <>
      <StyledPDFDisplay>
        <Stack
          direction="row"
          spacing={0.5}
          sx={{
            heigth: 'fit-content',
            padding: '12px',
            backgroundColor: '#2e2e2e',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center'
          }}
        >
          <Stack
            direction="row"
            spacing={1}
            sx={{
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <StyledIconButton data-cy="decrease-zoom-button" onClick={decreaseZoom}>
              <RemoveIcon />
            </StyledIconButton>
            <Typography data-cy="zoom-level-display" sx={{ backgroundColor: '#2e2e2e' }}>
              {Math.ceil(zoomLevel * 100)}%
            </Typography>
            <StyledIconButton data-cy="increase-zoom-button" onClick={increaseZoom}>
              <AddIcon />
            </StyledIconButton>
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            {NumberInputBasic()}

            <Typography> of {numPages || '--'} pages</Typography>
          </Stack>

          <TextField
            data-cy="text-search-field"
            placeholder="Search"
            variant="outlined"
            value={searchText}
            size="small"
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setSearchText(event.target.value);
            }}
            color="secondary"
            sx={{
              backgroundColor: '#e4e4e4',
              borderRadius: '4px'
            }}
          />
          <Button
            data-cy="close-button"
            children={<CloseIcon />}
            type="button"
            onClick={() => setShowPDF(false)}
            sx={{
              backgroundColor: 'white',
              color: theme.palette.secondary.light,
              marginLeft: 'auto',
              '&:hover': {
                backgroundColor: '#cecece'
              }
            }}
          />
        </Stack>
        <Box
          sx={{
            width: '60vw',
            height: '80vh',
            gap: '10px',
            backgroundColor: '#3d3d3d',
            overflow: 'auto',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          {
            <Document data-cy="pdf-document" file={source.link} onLoadSuccess={onDocumentLoadSuccess}>
              <Stack gap={3 * zoomLevel}>
                {Array.from(new Array(numPages), (el, index) => (
                  <Page
                  data-cy={`pdf-page_${index + 1}`}
                  key={`page_${index + 1}`}
                    inputRef={(ref) => {
                      if (ref && pageNumber === index + 1) {
                        ref.scrollIntoView();
                      }
                    }}
                    pageNumber={index + 1}
                    renderTextLayer={true}
                    renderAnnotationLayer={true}
                    scale={zoomLevel}
                    customTextRenderer={textRenderer}
                    width={window.innerWidth * 0.4}
                  />
                ))}
              </Stack>
            </Document>
          }
        </Box>
      </StyledPDFDisplay>
    </>
  );
}
