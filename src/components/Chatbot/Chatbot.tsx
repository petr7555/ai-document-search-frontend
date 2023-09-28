import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Stack, Typography } from '@mui/material';
import { PrimaryButton } from '../Button/PrimaryButton';
import { CenterPageContent } from '../CenterPageContent';
import { ConversationLayout } from '../ConversationLayout';
import { Inputfield } from './InputField';

export type messageType = {
  originBot: boolean;
  text: string;
};

export const Chatbot = () => {
  const [conversation, setConversation] = useState<messageType[]>([]);

  const addMessageToConversation = (message: messageType) => {
    setConversation([...conversation, message]);
  };

  return (
    <CenterPageContent>
      <Stack
        spacing={2}
        direction="row"
        alignItems={'center'}
        justifyContent={'flex-end'}
        sx={{ marginBottom: '20px', width: '60vw' }}
      >
        <Typography sx={{ paddingRight: '275px' }} variant="h4">
          Chatbot
        </Typography>
        <PrimaryButton
          sx={{
            borderRadius: '20px',
            color: 'white',
            gap: '5px',
            padding: '10px 10px 10px 15px'
          }}
          onClick={() => setConversation([])}
          aria-label="new conversation"
        >
          <Typography sx={{ textTransform: 'initial' }}>
            New conversation
          </Typography>
          <AddIcon />
        </PrimaryButton>
      </Stack>
      <ConversationLayout conversation={conversation} />
      <Inputfield sendMessage={addMessageToConversation} />
    </CenterPageContent>
  );
};
