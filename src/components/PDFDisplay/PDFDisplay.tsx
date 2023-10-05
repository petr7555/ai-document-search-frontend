import React, { useState, ChangeEvent, } from 'react';
import { Document, Page} from 'react-pdf';

import { Box, TextField } from '@mui/material';

import { pdfjs } from 'react-pdf';
import { CenterPageContent } from '../CenterPageContent';
import PageSelector from './PageSelector'

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
  
  export function PDFDisplay() {
    const [numPages, setNumPages] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);
  
    function onDocumentLoadSuccess({ numPages } : {numPages : number}) {
      setNumPages(numPages);
      setPageNumber(1);
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
  
    return (
      <>
          <Document
            file={'http://localhost:3000/reflection_report.pdf'}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} renderTextLayer={false} renderAnnotationLayer={false} scale={1.0} height={500} />
          </Document>
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
        </div>
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

  
