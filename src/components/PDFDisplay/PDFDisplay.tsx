import React, { useCallback, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import RemoveIcon from '@mui/icons-material/Remove';
import { Box, Button, Stack } from '@mui/material';
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

export function PDFDisplay({ source, setShowPDF }: PDFDisplayProps) {
  const [loading, setLoading] = useState(true);
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState<number | undefined>(undefined);
  const [zoomLevel, setZoomLevel] = useState(1.0);

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

  const [searchText, setSearchText] = useState('');

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
      <Stack>
        <Stack
          direction="row"
          spacing={4}
          sx={{
            width: '60vw',
            height: '7vh',
            backgroundColor: '#2e2e2e',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Stack
            direction="row"
            spacing={0.5}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <button
              children={<RemoveIcon />}
              type="button"
              onClick={decreaseZoom}
            />
            <button
              color="#e4e4e4"
              children={<AddIcon sx={{ color: 'black' }} />}
              type="button"
              onClick={increaseZoom}
            />
          </Stack>
          <Stack
            direction="row"
            spacing={0.5}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <NumberInputBasic />
            <Box
              sx={{
                backgroundColor: '#e4e4e4',
                padding: '6px',
                border: 1
              }}
            >
              of {numPages || '--'}
            </Box>
          </Stack>
          <Button
            children={<CloseIcon />}
            type="button"
            onClick={() => setShowPDF(false)}
            sx={{
              backgroundColor: 'red',
              color: 'white',
              marginLeft: 'auto'
            }}
          />
          <div>
            <label htmlFor="search">Search:</label>
            <input
              type="search"
              id="search"
              value={searchText}
              onChange={onChange}
            />
          </div>
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
                    width={0.4}
                  />
                ))}
              </Stack>
            </Document>
          }
        </Box>
      </Stack>
    </>
  );
}
