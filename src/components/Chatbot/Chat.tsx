import React, { FC, useEffect, useRef } from 'react';
import { Box, CircularProgress, Stack } from '@mui/material';
import { Conversation } from '../../api/getLatestConversation';
import MessageBubble from './MessageBubble';

type Props = {
  conversation?: Conversation;
};

const Chat: FC<Props> = ({ conversation }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  return (
    <Box
      sx={{
        p: 3,
        overflow: 'auto',
        flexGrow: 1
      }}
    >
      {conversation ? (
        <Stack direction="column" spacing={2}>
          {conversation.messages.map((message) => (
            <MessageBubble key={crypto.randomUUID()} message={message} />
          ))}
          <Box ref={bottomRef} />
        </Stack>
      ) : (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            height: '100%',
            alignItems: 'center'
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default Chat;
