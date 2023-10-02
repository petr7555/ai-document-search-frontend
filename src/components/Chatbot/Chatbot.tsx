import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Alert, AlertTitle, Stack, Typography } from '@mui/material';
import { messageChatbot } from '../../api/messageChatbot';
import { PrimaryButton } from '../Button/PrimaryButton';
import { CenterPageContent } from '../CenterPageContent';
import { ConversationLayout } from './ConversationLayout';
import { Inputfield } from './InputField';

export type Message = {
  originBot: boolean;
  text: string;
};

export const Chatbot = () => {
  const [conversation, setConversation] = useState<Message[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const addMessageToConversation = async (message: Message) => {
    setConversation([...conversation, message]);
    try {
      setLoading(true);
      setConversation([
        ...conversation,
        message,
        { originBot: true, text: '...' }
      ]);
      await messageChatbot(message.text).then((response) => {
        if (response.ok) {
          setConversation([
            ...conversation,
            message,
            { originBot: true, text: response.answer }
          ]);
          
          setLoading(false);
        } else {
          setError(true);
        }
      });
    } catch (error) {
      setError(true);
    }
  };

  return (
    <CenterPageContent data-cy="chatbot">
      <Stack
        spacing={2}
        direction="row"
        alignItems={'center'}
        justifyContent={'flex-end'}
        sx={{ marginBottom: '20px', width: '60vw' }}
      >
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
      <ConversationLayout loading={loading} conversation={conversation} />
      <Inputfield sendMessage={addMessageToConversation} />
      {error && (
        <Alert
          severity="error"
          color="error"
          data-cy="chatbot-response-error"
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
          <AlertTitle>Unknown error</AlertTitle>
        </Alert>
      )}
    </CenterPageContent>
  );
};
