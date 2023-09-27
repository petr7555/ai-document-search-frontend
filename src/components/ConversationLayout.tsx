import React from 'react';
import styled from '@emotion/styled';
import { Paper, Stack } from '@mui/material';
import { messageType } from './Chatbot/Chatbot';

const MessageBubble = styled(Paper)(({ fromBot }: { fromBot: boolean }) => ({
  maxWidth: '500px',
  minHeight: '30px',
  borderRadius: '20px',
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
  conversation
}: {
  conversation: messageType[];
}) => {
  const messages = conversation.map((message) => {
    return (
      <MessageBubble fromBot={message.originBot}>
        <p>{message.text}</p>
      </MessageBubble>
    );
  });
  return (
    <Stack
      sx={{
        padding: '20px',
        width: '800px',
        height: '600px',
        gap: '10px',
        borderRadius: '10px',
        backgroundColor: 'white'
      }}
    >
      {messages}
    </Stack>
  );
};
