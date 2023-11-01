import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import AddIcon from '@mui/icons-material/Add';
import { Alert, AlertTitle, Stack, Typography } from '@mui/material';
import { getFilters } from '../../api/getFilters';
import { loadConversation } from '../../api/loadConversation';
import { messageChatbot } from '../../api/messageChatbot';
import { newConversation } from '../../api/newConversation';
import { MessageBubbleProps } from '../../types/conversationTypes';
import { AvailableFilterOptions, Filters } from '../../types/filterTypes';
import { PrimaryButton } from '../Button/PrimaryButton';
import { FilteringModal } from '../Filtering/FilteringModal';
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
  const [errorMessage, setErrorMessage] = useState(
    'Unknown error retrieving conversation'
  );
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Filters[]>([
    {
      property_name: 'isin',
      values: []
    },
    {
      property_name: 'shortname',
      values: []
    }
  ]);

  const [filterOptions, setFilterOptions] = useState<AvailableFilterOptions>({
    isin: [],
    shortname: []
  });

  const loadFilters = async () => {
    const response = await getFilters();
    if (response.ok) {
      setFilterOptions({
        isin:
          response.filters.isin && response.filters.isin.map((isin) => isin),
        shortname:
          response.filters.shortname &&
          response.filters.shortname.map((shortname) => shortname)
      });
    } else {
      setErrorMessage(response.detail);
      setError(true);
    }
  };

  const handleFilterButtonClick = () => {
    if (filterModalOpen) {
      setFilterModalOpen(false);
    } else {
      setFilterModalOpen(true);
    }
  };

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
        const response = await messageChatbot(message.text, activeFilters);
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

  useEffect(() => {
    loadConversationFromBackend();
    loadFilters();
  }, []);

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
      <ConversationLayout
        loading={loading}
        responding={responding}
        messages={messages}
      />
      <FilteringModal
        open={filterModalOpen}
        handleClose={() => setFilterModalOpen(false)}
        filterOptions={filterOptions}
        setActiveFilters={setActiveFilters}
        activeFilters={activeFilters}
      />
      <Inputfield
        handleFiltering={handleFilterButtonClick}
        loading={loading}
        responding={responding}
        sendMessage={addMessageToConversation}
      />
    </CenterPageContent>
  );
};
