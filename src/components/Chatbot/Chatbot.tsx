import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import AddIcon from '@mui/icons-material/Add';
import { Alert, AlertTitle, Stack, Typography } from '@mui/material';
import { loadConversation } from '../../api/loadConversation';
import { messageChatbot } from '../../api/messageChatbot';
import { newConversation } from '../../api/newConversation';
import { MessageBubbleProps, Source } from '../../types/conversationTypes';
import { PrimaryButton } from '../Button/PrimaryButton';
import { CenterPageContent } from '../Layout/CenterPageContent';
import { PDFDisplay } from '../PDFDisplay/PDFDisplay';
import { ConversationLayout } from './ConversationLayout';
import { Inputfield } from './InputField';

const NewConversationButton = styled(PrimaryButton)(() => ({
  borderRadius: '20px',
  color: 'white',
  marginBottom: '4px',
  gap: '5px',
  flexWrap: 'nowrap',
  padding: '10px 10px 10px 15px',
  minWidth: 'fit-content',
  '@media (max-width: 600px)': {
    fontSize: '0.75rem'
  }
}));

const ChatbotContainer = styled(Stack)(() => ({
  width: '100%',
  margin: 'auto',
  padding: '40px'
}));

export const Chatbot = () => {
  const [messages, setMessages] = useState<MessageBubbleProps[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [responding, setResponding] = useState(false);
  const [conversationCreated, setConversationCreated] = useState<string | null>(
    null
  );
  const [errorMessage, setErrorMessage] = useState(
    'Unknown error retrieving conversation'
  );
  const [showPdf, setShowPdf] = useState(false);
  const [chosenSource, setChosenSource] = useState<Source>();

  const loadConversationFromBackend = async () => {
    setLoading(true);
    try {
      const response = await loadConversation();
      if (response.ok) {
        setMessages(response.conversation.messages);
        setConversationCreated(
          new Date(response.conversation.created_at).toLocaleDateString()
        );
      } else {
        setErrorMessage(response.detail);
        setMessages([]);
        setError(true);
      }
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
    } finally {
      setResponding(false);
    }
  };

  const handleNewConversation = async () => {
    setMessages([]);
    setLoading(true);
    const response = await newConversation();
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
    setLoading(false);
  };

  const handleShowPDF = (source: Source) => {
    setChosenSource(source);
    setShowPdf(true);
  };

  useEffect(() => {
    loadConversationFromBackend();
  }, []);

  return (
    <CenterPageContent>
      <Stack direction={'row'} sx={{ height: '100%' }}>
        <ChatbotContainer direction={'column'} alignItems={'center'}>
          <Stack
            direction="row"
            alignItems={'flex-end'}
            justifyContent={'space-between'}
            sx={{ marginBottom: '4px', width: '100%' }}
          >
            <Typography
              sx={{
                color: '#5d5a5a',
                marginLeft: '0px',
                visibility: conversationCreated ? 'visible' : 'hidden',
                fontSize: {
                  xs: '0.5rem',
                  sm: '0.75rem',
                  md: '1rem'
                }
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
              <Typography
                sx={{
                  textTransform: 'initial',
                  whiteSpace: 'nowrap',
                  fontSize: {
                    xs: '0.5rem',
                    sm: '0.75rem',
                    md: '1rem'
                  }
                }}
              >
                New conversation
              </Typography>
              <AddIcon />
            </NewConversationButton>
          </Stack>

          <ConversationLayout
            loading={loading}
            responding={responding}
            messages={messages}
            handleShowPDF={handleShowPDF}
          />
          <Inputfield
            loading={loading}
            responding={responding}
            sendMessage={addMessageToConversation}
          />
        </ChatbotContainer>
        {showPdf && chosenSource && (
          <PDFDisplay source={chosenSource} setShowPDF={setShowPdf} />
        )}
      </Stack>
    </CenterPageContent>
  );
};
