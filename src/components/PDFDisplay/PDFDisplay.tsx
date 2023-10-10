import React, { MouseEventHandler, useState, } from 'react';
import { pdfjs, Document, Page, } from 'react-pdf';

import { Box, Button, Stack } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';


pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();
  

export function PDFDisplay(props: {close: () => void}) {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(1.0);
  const [fileURL, setFileURL] = useState('http://localhost:3000/reflection_report.pdf');


  const ZOOMRATE = 1.5

  function onDocumentLoadSuccess({ numPages } : {numPages : number}) {
    setNumPages(numPages);
    setPageNumber(1);
    setZoomLevel(1.0);
  }

  function changePage(offset : number) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
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
              children={<AddIcon />}
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
          borderRadius: '10px',
          backgroundColor: '#3d3d3d',
          overflow: 'scroll',
          display: 'flex', justifyContent: 'center', 
        }}
      >
        {<Document
          file={fileURL}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} renderTextLayer={false} renderAnnotationLayer={false} scale={zoomLevel}/>
        </Document>}
    </Box>
    </Stack>
    </>
  );
}

/*
  return (
    <div>
      <PageSelector/>
    </div>
  )
}*/

  
