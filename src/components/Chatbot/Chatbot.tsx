import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import AddIcon from '@mui/icons-material/Add';
import { Alert, AlertTitle, Stack, Typography } from '@mui/material';
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
  const [conversation, setConversation] = useState<MessageBubbleProps[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [conversationCreated, setConversationCreated] = useState<string | null>(
    null
  );

  const loadConversationFromBackend = async () => {
    try {
      await loadConversation().then((response) => {
        if (response.ok) {
          setConversation(response.conversation.messages);
          setConversationCreated(response.conversation.created_at.slice(0, 10));
        } else {
          setConversation([]);
        }
      });
    } catch (error) {
      setError(true);
    }
  };

  const addMessageToConversation = async (message: MessageBubbleProps) => {
    setConversation([...conversation, message]);
    try {
      setLoading(true);
      {
        !message.is_from_bot &&
          setConversation([
            ...conversation,
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
      !message.is_from_bot &&
        (await messageChatbot(message.text).then((response) => {
          if (response.ok) {
            setConversation([
              ...conversation,
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
            setConversation([
              ...conversation,
              {
                is_from_bot: false,
                text: message.text
              },
              {
                is_from_bot: true,

                text: response.detail,
                sources: [],

                error: true
              }
            ]);
          }
        }));
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadConversationFromBackend();
  }, []);

  const handleNewConversation = async () => {
    setConversation([]);
    try {
      await newConversation().then((response) => {
        if (response.ok) {
          setConversationCreated(response.created_at.slice(0, 10));
        } else {
          setConversationCreated(null);
          setConversation([
            {
              is_from_bot: true,

              text: response.detail,
              sources: [],

              error: true
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
        spacing={2}
        direction="row"
        alignItems={'flex-end'}
        justifyContent={conversationCreated ? 'space-between' : 'flex-end'}
        sx={{ marginBottom: '20px', width: '62vw' }}
      >
        {conversationCreated && (
          <Typography sx={{ color: '#5d5a5a', marginLeft: '0px' }}>
            Conversation started at: {conversationCreated}
          </Typography>
        )}

        <NewConversationButton
          onClick={() => handleNewConversation()}
          aria-label="new conversation"
        >
          <Typography sx={{ textTransform: 'initial' }}>
            New conversation
          </Typography>
          <AddIcon />
        </NewConversationButton>
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
