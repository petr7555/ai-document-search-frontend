import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Stack, Typography } from '@mui/material';
import { messageChatbot } from '../../api/messageChatbot';
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
  const [error, setError] = useState(false);

  const addMessageToConversation = async (message: messageType) => {
    setConversation([...conversation, message]);
    try {
      await messageChatbot(message.text).then((response) => {
        if (response.ok) {
          setConversation([
            ...conversation,
            { originBot: true, text: response.answer }
          ]);
        }
      });
    } catch (error) {
      setError(true);
    }
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
      {error && (
        <Typography sx={{ color: 'red' }}>
          Something went wrong, please try again
        </Typography>
      )}
    </CenterPageContent>
  );
};
