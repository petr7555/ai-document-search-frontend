import React, { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import TuneIcon from '@mui/icons-material/Tune';
import { Alert, AlertTitle } from '@mui/material';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import { Message } from '../../types/conversationTypes';

export const Inputfield = ({
  sendMessage
}: {
  sendMessage: (message: Message) => void;
}) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  const handleSendMessage = () => {
    const trimmedInput = input.trim();

    if (trimmedInput.length === 0) {
      setError(true);
    } else {
      sendMessage({ is_from_bot: false, text: input });
      setInput('');
    }
  };

  return (
    <>
      <Alert
        severity="info"
        color="info"
        data-cy="chatbot-input-error"
        onClose={() => setError(false)}
        sx={{
          visibility: error ? 'visible' : 'hidden',
          position: 'fixed',
          width: '20vw',
          height: '4vh',
          top: '10vh',
          paddingTop: '10px',
          alignContent: 'center',
          textAlign: 'center'
        }}
      >
        <AlertTitle>Please enter a message</AlertTitle>
      </Alert>
      <Paper
        component="form"
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault();
            handleSendMessage();
          }
        }}
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: '40vw',
          marginTop: '20px'
        }}
      >
        <IconButton sx={{ p: '10px' }} aria-label="filter">
          <TuneIcon />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Ask a question"
          data-cy="chatbot-input-field"
          value={input}
          onChange={(event) => {
            setInput(event.target.value);
          }}
          inputProps={{ 'aria-label': 'Ask a question' }}
        />
        <IconButton
          onClick={handleSendMessage}
          type="button"
          sx={{ p: '10px' }}
          data-cy="chatbot-send-button"
          aria-label="send"
        >
          <SendIcon color={input.length > 0 ? 'primary' : 'inherit'} />
        </IconButton>
      </Paper>
    </>
  );
};
