import React, { useEffect, useState } from 'react';
import { Divider, Paper, Stack } from '@mui/material';
import { askQuestion, Filter } from '../api/askQuestion';
import { createNewConversation as createNewConversationApi } from '../api/createNewConversation';
import {
  Conversation,
  getLatestConversation as getLatestConversationApi,
  Message
} from '../api/getLatestConversation';
import ChatConversation from '../components/Chat/ChatConversation';
import ChatHeader from '../components/Chat/ChatHeader';
import QuestionInput from '../components/Chat/QuestionInput';
import useError from '../hooks/useError';
import usePageTitle from '../hooks/usePageTitle';

const pendingMessage: Message = {
  is_from_bot: true,
  text: '...',
  sources: []
};

export const ChatPage = () => {
  usePageTitle('Chat');

  const [, setError] = useError();

  const [conversation, setConversation] = useState<Conversation>();
  const [gettingLatestConversation, setGettingLatestConversation] =
    useState(true);
  const [creatingNewConversation, setCreatingNewConversation] = useState(false);
  const [askingQuestion, setAskingQuestion] = useState(false);

  const createNewConversation = async () => {
    setCreatingNewConversation(true);
    const response = await createNewConversationApi();
    if (response.ok) {
      setConversation(response.data);
    } else {
      setError(response.detail);
    }
    setCreatingNewConversation(false);
  };

  const handleQuestionAsked = async (text: string, filters: Filter[]) => {
    setAskingQuestion(true);
    setConversation((conv) => {
      if (!conv) {
        return conv;
      }
      return {
        ...conv,
        messages: [
          ...conv.messages,
          { is_from_bot: false, text, sources: null },
          pendingMessage
        ]
      };
    });
    const response = await askQuestion(text, filters);
    const answer = response.ok
      ? {
          is_from_bot: true as const,
          ...response.data
        }
      : {
          is_from_bot: true as const,
          text: response.detail,
          sources: []
        };
    setConversation((conv) => {
      if (!conv) {
        return conv;
      }
      return {
        ...conv,
        messages: [...conv.messages.slice(0, -1), answer]
      };
    });
    setAskingQuestion(false);
  };

  useEffect(() => {
    const getLatestConversation = async () => {
      const response = await getLatestConversationApi();
      if (response.ok) {
        setConversation(response.data);
      } else {
        setError(response.detail);
      }
    };

    getLatestConversation().then(() => setGettingLatestConversation(false));
  }, [setError]);

  return (
    <Paper elevation={3} sx={{ mt: 4 }}>
      <Stack direction="column" sx={{ width: '80vw', height: '80vh' }}>
        <ChatHeader
          gettingLatestConversation={gettingLatestConversation}
          creatingNewConversation={creatingNewConversation}
          askingQuestion={askingQuestion}
          conversation={conversation}
          createNewConversation={createNewConversation}
        />
        <Divider sx={{ borderBottomWidth: 2 }} />
        <ChatConversation
          conversation={conversation}
          loading={gettingLatestConversation || creatingNewConversation}
        />
        <QuestionInput
          disabled={
            !conversation ||
            askingQuestion ||
            gettingLatestConversation ||
            creatingNewConversation
          }
          onQuestionAsked={handleQuestionAsked}
        />
      </Stack>
    </Paper>
  );
};
