import React, { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import TuneIcon from '@mui/icons-material/Tune';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import { Message } from '../../types/conversationTypes';

export const Inputfield = ({
  sendMessage,
  loading,
  responding
}: {
  sendMessage: (message: Message) => void;
  loading: boolean;
  responding: boolean;
}) => {
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    sendMessage({ is_from_bot: false, text: input });
    setInput('');
  };

  const canSendMessage = () => {
    return input.trim().length > 0 && !loading && !responding;
  };

  return (
    <>
      <Paper
        component="form"
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault();
            if (canSendMessage()) {
              handleSendMessage();
            }
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
          disabled={!canSendMessage()}
        >
          <SendIcon color={canSendMessage() ? 'primary' : 'inherit'} />
        </IconButton>
      </Paper>
    </>
  );
};
