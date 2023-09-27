import { useState } from 'react';
import { Typography } from '@mui/material';
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
      <Typography variant="h4">Chatbot</Typography>
      <ConversationLayout conversation={conversation} />
      <Inputfield sendMessage={addMessageToConversation} />
    </CenterPageContent>
  );
};
