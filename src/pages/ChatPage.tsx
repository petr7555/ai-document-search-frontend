import React, { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import LoadingButton from '@mui/lab/LoadingButton';
import { Alert, Divider, Paper, Stack } from '@mui/material';
import { askQuestion, Filter } from '../api/askQuestion';
import { createNewConversation as createNewConversationApi } from '../api/createNewConversation';
import {
  Conversation,
  getLatestConversation as getLatestConversationApi,
  Message
} from '../api/getLatestConversation';
import Chat from '../components/Chatbot/Chat';
import QuestionInput from '../components/Chatbot/QuestionInput';
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

  const [conversationLoading, setConversationLoading] = useState(true);
  const [creatingNewConversation, setCreatingNewConversation] = useState(false);
  const [conversation, setConversation] = useState<Conversation>();

  const [responding, setResponding] = useState(false);

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
    setResponding(true);
    setConversation((conv) => {
      if (!conv) {
        return conv;
      }
      return {
        ...conv,
        messages: [
          ...conv.messages,
          { is_from_bot: false, text },
          pendingMessage
        ]
      };
    });
    const response = await askQuestion(text, filters);
    const answer = response.ok
      ? {
          is_from_bot: true,
          ...response.data
        }
      : {
          is_from_bot: true,
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
    setResponding(false);
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

    getLatestConversation().then(() => setConversationLoading(false));
  }, [setError]);

  return (
    <Paper elevation={3} sx={{ mt: 4 }}>
      <Stack direction="column" sx={{ width: '80vw', height: '80vh' }}>
        {/* HEADER */}
        <Stack
          direction="row"
          spacing={4}
          alignItems="stretch"
          justifyContent="space-between"
          sx={{
            p: 1,
            boxShadow: '0px 10px 10px rgba(0, 0, 0, 0.1)',
            zIndex: 1
          }}
        >
          <Alert severity="info">
            {conversation
              ? `Conversation started on ${new Date(
                  conversation.created_at
                ).toLocaleDateString()} at ${new Date(
                  conversation.created_at
                ).toLocaleTimeString()}.`
              : 'Conversation is loading...'}
          </Alert>
          <LoadingButton
            data-cy="new-conversation-button"
            aria-label="New conversation"
            onClick={createNewConversation}
            startIcon={<AddIcon />}
            loading={creatingNewConversation}
            loadingPosition="start"
            variant="contained"
            disabled={conversationLoading || responding}
          >
            New conversation
          </LoadingButton>
        </Stack>
        <Divider sx={{ borderBottomWidth: 2 }} />
        {/* CHAT */}
        <Chat conversation={conversation} />
        {/* INPUT */}
        <QuestionInput
          disabled={
            !conversation ||
            responding ||
            conversationLoading ||
            creatingNewConversation
          }
          onQuestionAsked={handleQuestionAsked}
        />
      </Stack>
    </Paper>
  );
};
