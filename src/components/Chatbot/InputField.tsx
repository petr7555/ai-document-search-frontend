import { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import TuneIcon from '@mui/icons-material/Tune';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import { messageType } from './Chatbot';

export const Inputfield = ({
  sendMessage
}: {
  sendMessage: (message: messageType) => void;
}) => {
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    sendMessage({ originBot: false, text: input });
    setInput('');
  };

  return (
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
        width: 600,
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
        aria-label="send"
      >
        <SendIcon />
      </IconButton>
    </Paper>
  );
};
