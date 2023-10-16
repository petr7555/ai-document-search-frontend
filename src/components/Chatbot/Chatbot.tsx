import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import AddIcon from '@mui/icons-material/Add';
import {
  Alert,
  AlertTitle,
  CircularProgress,
  Stack,
  Typography
} from '@mui/material';
import { loadConversation } from '../../api/loadConversation';
import { messageChatbot } from '../../api/messageChatbot';
import { newConversation } from '../../api/newConversation';
import { MessageBubbleProps } from '../../types/conversationTypes';
import { PrimaryButton } from '../Button/PrimaryButton';
import { CenterPageContent } from '../Layout/CenterPageContent';
import { ConversationLayout } from './ConversationLayout';
import { Inputfield } from './InputField';

const NewConversationButton = styled(PrimaryButton)(() => ({
  borderRadius: '20px',
  color: 'white',
  gap: '5px',
  padding: '10px 10px 10px 15px'
}));

export const Chatbot = () => {
  const [messages, setMessages] = useState<MessageBubbleProps[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [responding, setResponding] = useState(false);
  const [conversationCreated, setConversationCreated] = useState<string | null>(
    null
  );
  const [errorMessage, setErrorMessage] = useState('Unknown error');

  const loadConversationFromBackend = async () => {
    setLoading(true);
    try {
      setLoading(true);
      loadConversation().then((response) => {
        if (response.ok) {
          setMessages(response.conversation.messages);
          setConversationCreated(response.conversation.created_at.slice(0, 10));
        } else {
          setMessages([]);
          setError(true);
          setErrorMessage(response.detail);
        }
      });
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const addMessageToConversation = async (message: MessageBubbleProps) => {
    setResponding(true);
    setMessages([...messages, message]);
    try {
      {
        !message.is_from_bot &&
          setMessages([
            ...messages,
            {
              is_from_bot: false,
              text: message.text
            },
            {
              is_from_bot: true,

              text: '...',
              sources: []
            }
          ]);
      }
      if (!message.is_from_bot) {
        const response = await messageChatbot(message.text);
        if (response.ok) {
          setMessages([
            ...messages,
            {
              is_from_bot: false,
              text: message.text
            },
            {
              is_from_bot: true,

              text: response.text,
              sources: response.sources
            }
          ]);
        } else {
          setMessages([
            ...messages,
            {
              is_from_bot: false,
              text: message.text
            },
            {
              is_from_bot: true,

              text: response.detail,
              sources: [],

              error: 'true'
            }
          ]);
        }
      }
    } catch (error) {
      setError(true);
    } finally {
      setResponding(false);
    }
  };

  useEffect(() => {
    loadConversationFromBackend();
  }, []);

  const handleNewConversation = async () => {
    setMessages([]);
    try {
      newConversation().then((response) => {
        if (response.ok) {
          setConversationCreated(
            new Date(response.created_at).toLocaleDateString()
          );
        } else {
          setConversationCreated(null);
          setMessages([
            {
              is_from_bot: true,
              text: response.detail,
              sources: [],
              error: 'true'
            }
          ]);
        }
      });
    } catch (error) {
      setError(true);
    }
  };

  return (
    <CenterPageContent data-cy="chatbot">
      <Stack
        direction="row"
        alignItems={'flex-end'}
        justifyContent={'space-between'}
        sx={{ margin: '15px', width: '62vw' }}
      >
        <Typography
          sx={{
            color: '#5d5a5a',
            marginLeft: '0px',
            visibility: conversationCreated ? 'visible' : 'hidden'
          }}
        >
          Conversation started at: {conversationCreated}
        </Typography>

        <Alert
          severity="error"
          color="error"
          data-cy="chatbot-response-error"
          onClose={() => setError(false)}
          sx={{
            minWidth: '20vw',
            alignContent: 'center',
            textAlign: 'center',
            visibility: error ? 'visible' : 'hidden'
          }}
        >
          <AlertTitle>{errorMessage}</AlertTitle>
        </Alert>

        <NewConversationButton
          data-cy="new-conversation-button"
          onClick={() => handleNewConversation()}
          aria-label="new conversation"
        >
          <Typography sx={{ textTransform: 'initial' }}>
            New conversation
          </Typography>
          <AddIcon />
        </NewConversationButton>
      </Stack>
      {loading ? (
        <CircularProgress color="primary" />
      ) : (
        <ConversationLayout responding={responding} messages={messages} />
      )}
      <Inputfield
        loading={loading}
        responding={responding}
        sendMessage={addMessageToConversation}
      />
    </CenterPageContent>
  );
};
