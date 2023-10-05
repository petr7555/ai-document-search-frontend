import React from 'react';
import { CenterPageContent } from '../components/CenterPageContent';
import { Navbar } from '../components/Navbar/Navbar';
import  { PDFDisplay } from '../components/PDFDisplay/PDFDisplay';
import { Chatbot } from '../components/Chatbot/Chatbot';
import { Stack, Grid, Box } from '@mui/material';
import { flexbox } from '@mui/system';

import ReactDOM from 'react-dom';
import { PDFViewer } from '@react-pdf/renderer';


export const PDFPage = () => {
  return (
    <>
      <PDFDisplay />
    </>
  );
};


/*
export const PDFPage = () => {
  return (
    <>
      <Navbar />
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={6}>
          <Chatbot/>
        </Grid>
        <Grid item xs={6}>
          <PDFDisplay />
        </Grid>
      </Grid>
    </>
  );
};*/

/*
import { useState } from 'react';
import { TextField, Button} from '@mui/material';

export const PDFPage = () => {
  const [inputText, setInputText] = useState('');
  const [showText, setShowText] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleShowText = () => {
    setShowText(true);
  };

  const handleHideText = () => {
    setShowText(false);
  };

  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <div style={{ flex: 1, padding: '16px' }}>
        <TextField
          label="Enter Text"
          variant="outlined"
          fullWidth
          value={inputText}
          onChange={handleInputChange}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleShowText}
          style={{ marginTop: '16px' }}
        >
          Show Text
        </Button>
        {showText && (
          <Button
            variant="contained"
            color="secondary"
            onClick={handleHideText}
            style={{ marginTop: '16px' }}
          >
            Hide Text
          </Button>
        )}
      </div>
      {showText && (
        <div style={{ flex: 1, padding: '16px', backgroundColor: '#f0f0f0' }}>
          <Box
            border={1}
            borderColor="primary.main"
            padding="16px"
            borderRadius="5px"
          >
            <strong>Entered Text:</strong>
            <p>{inputText}</p>
          </Box>
        </div>
      )}
    </div>
  );
};

//export default PDFPage;*/
