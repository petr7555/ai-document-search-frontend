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
import theme from '../../themes/theme';
import { Source } from '../../types/conversationTypes';
import { CustomNumberInput } from './CustomNumberInput';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

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
  const [loading, setLoading] = useState(true);
  const [numPages, setNumPages] = useState(5);
  const [pageNumber, setPageNumber] = useState<number | undefined>(undefined);
  const [zoomLevel, setZoomLevel] = useState(1.0);
  const [searchText, setSearchText] = useState('');

  const ZOOMRATE = 1.5;

  const NumberInputBasic = () => {
    return (
      <CustomNumberInput
        placeholder="…"
        value={pageNumber}
        onChange={(event, val) => {
          if (val == null || val < 1) {
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

  const textRenderer = useCallback(
    (textItem: string) => highlightPattern(textItem, searchText),
    [searchText]
  );

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(event.target.value);
  }

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
          spacing={4}
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
            <StyledIconButton onClick={decreaseZoom}>
              <RemoveIcon />
            </StyledIconButton>
            <Typography sx={{ backgroundColor: '#2e2e2e' }}>
              {zoomLevel * 100}%
            </Typography>
            <StyledIconButton onClick={increaseZoom}>
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
            id="outlined-basic"
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
            <Document file={source.link}>
              <Stack gap={3 * zoomLevel}>
                {Array.from(new Array(numPages), (el, index) => (
                  <Page
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
                    /*
                    customTextRenderer={textRenderer}
                  */
                    width={window.innerWidth}
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
