import React, { MouseEventHandler, useState, } from 'react';
import { pdfjs, Document, Page, } from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'

import { Box, Button, Stack } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

import styled from '@emotion/styled';
import { Button, ButtonProps } from '@mui/material';
import theme from '../../themes/theme';

import { CustomNumberInput } from './CustomNumberInput';


pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();


const NumberInputBasic = () => {
  const [value, setValue] = React.useState<number | undefined>();
  return (
    <CustomNumberInput
      placeholder="…"
      value={value}
      onChange={(event, val) => setValue(val)}
    />
  );
}

function highlightPattern(text: string, pattern: string) {
  
  return text.replace(new RegExp(pattern, "i"), (value) => `<mark>${value}</mark>`);
}
  

export function PDFDisplay(props: {close: () => void}) {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(1.0);
  const [fileURL, setFileURL] = useState('http://localhost:3000/reflection_report.pdf');
  const [nativeWidth, setNativeWidth] = useState(0);
  const ZOOMRATE = 1.5

  async function onDocumentLoadSuccess(pdfObject: any) {
    const firstPage = await pdfObject.getPage(1);
    setNativeWidth(firstPage.width);
    setNumPages(pdfObject.numPages);
    setPageNumber(1);
    setZoomLevel(1.0);
  }

  function changePage(offset : number) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  const [searchText, setSearchText] = useState('');

  const textRenderer = React.useCallback(
    (textItem : any) => highlightPattern(textItem.str, searchText),
    [searchText]
  );

  function onChange(event : any) {
    setSearchText(event.target.value);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  function increaseZoom() {
    setZoomLevel(zoomLevel * ZOOMRATE)
  }

  function decreaseZoom() {
    setZoomLevel(zoomLevel / ZOOMRATE)
  }

  function loadFile(fileURL: string) {
    setFileURL(fileURL)
  }

  function hidePDF() {
    props.close()
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
          display: 'flex', justifyContent: 'center', alignItems: 'center',
        }}>
          <Stack
          direction="row"
          spacing={0.5}
          sx={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
          }}>
            <button
              children={<RemoveIcon />}
              type="button"
              onClick={decreaseZoom}
            />
            <button
              color="#e4e4e4"
              children={<AddIcon sx={{color: "white"}}/>}
              type="button"
              onClick={increaseZoom}
            />
            
          </Stack>
          <Stack
          direction="row"
          spacing={0.5}
          sx={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', 
          }}>
            <NumberInputBasic/>
            <Box sx={{
              backgroundColor: '#e4e4e4',
              padding: '6px',
              border: 1,
            }}>
              Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
            </Box>
            <button
              type="button"
              disabled={pageNumber <= 1}
              onClick={previousPage}
            >
              Previous
            </button>
            <button
              type="button"
              disabled={pageNumber >= numPages}
              onClick={nextPage}
            >
              Next
            </button>
            <Button
              children={<CloseIcon/>}
              type="button"
              onClick={hidePDF}
              sx={{
                backgroundColor: 'red',
                color: 'white',
                marginLeft: 'auto'
              }}
            />   
          </Stack>  
      </Stack>
      <Box
        sx={{
          width: '60vw',
          height: '80vh',
          gap: '10px',
          backgroundColor: '#3d3d3d',
          overflow: 'scroll',
          display: 'flex', justifyContent: 'center', 
        }}
      >
        {<Document
          file={fileURL}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Stack gap={3 * zoomLevel}>
            {Array.from(
              new Array(numPages),
              (el, index) => (
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  renderTextLayer={true}
                  renderAnnotationLayer={true} 
                  scale={zoomLevel}
                  customTextRenderer={textRenderer}
                  width={600}
                />
              ),
            )}
          </Stack>
        </Document>}
    </Box>
    </Stack>
    <div>
        <label htmlFor="search">Search:</label>
        <input type="search" id="search" value={searchText} onChange={onChange} />
      </div>
    </>
  );
}

  
