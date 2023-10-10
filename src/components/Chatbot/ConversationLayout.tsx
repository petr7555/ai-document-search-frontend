import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { Paper, Stack } from '@mui/material';
import { Message } from './Chatbot';

const MessageBubble = styled(Paper)(({ fromBot }: { fromBot: boolean }) => ({
  maxWidth: '80%',
  minHeight: 'fit-content',
  borderRadius: fromBot ? '10px 10px 10px 0px' : '10px 10px 0px 10px',
  textAlign: fromBot ? 'left' : 'right',
  alignItems: 'center',
  margin: '2px',
  padding: '0px 20px 0px 20px',
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'row',
  fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
  fontSize: '16px',
  fontWeight: 500,
  backgroundColor: fromBot ? '#e0e0e0' : '#b3d4fc',
  alignSelf: fromBot ? 'flex-start' : 'flex-end'
}));

export const ConversationLayout = ({
  conversation, showPDF
}: {
  conversation: Message[];
  showPDF: () => void
}) => {
function show() {
  showPDF();
}

  const messages = conversation.map((message) => {
    return (
      <MessageBubble
        data-cy={
          message.originBot ? 'chatbot-response-message' : 'user-input-message'
        }
        fromBot={message.originBot}
      >
        <p>{message.text}</p>
        {message.originBot && <button onClick={show}>Show source</button>}
      </MessageBubble>
    );
  });

  useEffect(() => {
    const bottom = document.getElementById('bottom');
    bottom?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  return (
    <Stack
      sx={{
        padding: '20px',
        width: '90%',
        maxHeight:'60vh',
        gap: '10px',
        borderRadius: '10px',
        backgroundColor: 'white',
        overflowY: 'scroll',
        overflowX: 'hidden',
        flexGrow: 1
      }}
    >
      {messages}
      <div id="bottom" />
    </Stack>
  );
};
