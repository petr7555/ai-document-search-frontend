import React, { useState, ChangeEvent, } from 'react';
import { Document, Page} from 'react-pdf';

import { Box, TextField, Stack } from '@mui/material';

import { pdfjs } from 'react-pdf';
import { CenterPageContent } from '../CenterPageContent';
import PageSelector from './PageSelector'

import { PDFViewer } from '@react-pdf/renderer';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

//import pdfile from './reflection_report.pdf';

/*
export const PDFDisplay = () => {
    //const [file, setFile] = useState('');
    
    //setFile('https://drive.google.com/file/d/1qshrlkCcjlc-2fcTpDT_d-MEQBqxPoot/view?usp=sharing')
    
    return (
      <Document file={'http://localhost:3000/reflection_report.pdf'}>
        <Page pageNumber={1} />
      </Document>
    );
  }*/

import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import NumberInput from './NumberInput'
  

  export function PDFDisplay() {
    const [numPages, setNumPages] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);
    const [zoomLevel, setZoomLevel] = useState(1.0);
  
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
      setZoomLevel(zoomLevel * 2)
    }

    function decreaseZoom() {
      setZoomLevel(zoomLevel / 2)
    }
  
    return (
      <>
      <Stack>
        <Box sx={{
            width: '60vw',
            height: '10vh',
            backgroundColor: 'gray',
          }}>
            
            <div>
            <p>
              Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
            </p>
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
            
          </div>
        </Box>
        <Box
          sx={{
            padding: '20px',
            width: '60vw',
            height: '80vh',
            gap: '10px',
            borderRadius: '10px',
            backgroundColor: 'white',
            overflowY: 'scroll',
            overflowX: 'scroll'
          }}
        >
          {<Document
            file={'http://localhost:3000/reflection_report.pdf'}
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

  
