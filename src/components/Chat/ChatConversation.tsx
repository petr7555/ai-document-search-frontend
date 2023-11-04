import React, { FC, useEffect, useRef } from 'react';
import { Box, CircularProgress, Stack } from '@mui/material';
import { Conversation } from '../../api/getLatestConversation';
import MessageBubble from './MessageBubble';

type Props = {
  conversation?: Conversation;
  loading: boolean;
};

const ChatConversation: FC<Props> = ({ conversation, loading }) => {
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
      {loading ? (
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
      ) : conversation ? (
        <Stack direction="column" spacing={2}>
          {conversation.messages.map((message) => (
            <MessageBubble key={crypto.randomUUID()} message={message} />
          ))}
          <Box ref={bottomRef} />
        </Stack>
      ) : null}
    </Box>
  );
};

export default ChatConversation;
