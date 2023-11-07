import React, { FC, useEffect, useState } from 'react';
import { Divider, Paper, Stack } from '@mui/material';
import { askQuestion, Filter } from '../../api/askQuestion';
import { createNewConversation as createNewConversationApi } from '../../api/createNewConversation';
import {
  Conversation,
  getLatestConversation as getLatestConversationApi,
  Message
} from '../../api/getLatestConversation';
import useError from '../../hooks/useError';
import ChatConversation from './ChatConversation';
import ChatHeader from './ChatHeader';
import QuestionInput from './QuestionInput';

const pendingMessage: Message = {
  role: 'pending'
};

type Props = {
  onPdfPreviewSrcChanged: (src: string) => void;
};

const Chatbot: FC<Props> = ({ onPdfPreviewSrcChanged }) => {
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
    const trimmedText = text.trim();
    setAskingQuestion(true);
    setConversation((conv) => {
      if (!conv) {
        return conv;
      }
      return {
        ...conv,
        messages: [
          ...conv.messages,
          { role: 'user', text: trimmedText, sources: null },
          pendingMessage
        ]
      };
    });
    const response = await askQuestion(trimmedText, filters);
    if (response.ok) {
      setConversation((conv) => {
        if (!conv) {
          return conv;
        }
        return {
          ...conv,
          messages: [
            ...conv.messages.slice(0, -1),
            {
              role: 'bot',
              ...response.data
            }
          ]
        };
      });
    } else {
      setConversation((conv) => {
        if (!conv) {
          return conv;
        }
        return {
          ...conv,
          messages: conv.messages.slice(0, -1)
        };
      });
      setError(response.detail, false);
    }
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
    <Paper data-cy="chatbot" elevation={3}>
      <Stack direction="column" sx={{ height: '80vh' }}>
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
          onPdfPreviewSrcChanged={onPdfPreviewSrcChanged}
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

export default Chatbot;
