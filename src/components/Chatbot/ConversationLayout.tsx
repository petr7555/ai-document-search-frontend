import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { Link, Stack } from '@mui/material';
import theme from '../../themes/theme';
import { MessageBubbleProps } from '../../types/conversationTypes';
import { BouncingLoader } from '../BouncingDotsLoader';
import { BotMessageBubble, UserMessageBubble } from './Messagebubbles';

const StyledLink = styled(Link)(() => ({
  color: `${theme.palette.primary.main}`,
  textDecoration: 'underline',
  textunderlineoffset: '2px',
  marginBottom: '8px',
  '&:hover': {
    color: `${theme.palette.primary.dark}`
  }
}));

export const ConversationLayout = ({
  conversation,
  loading
}: {
  conversation: MessageBubbleProps[];
  loading: boolean;
}) => {
  const messages = conversation.map((message) => {
    if (loading && message.is_from_bot && message.text === '...') {
      return (
        <BotMessageBubble
          data-cy="chatbot-response-message"
          key={crypto.randomUUID()}
          error="false"
        >
          <BouncingLoader>
            <div />
            <div />
            <div />
          </BouncingLoader>
        </BotMessageBubble>
      );
    } else {
      return (
        <>
          {message.is_from_bot ? (
            <BotMessageBubble
              data-cy="chatbot-response-message"
              key={crypto.randomUUID()}
              error={message?.error?.toString() ?? 'false'}
            >
              {message.text}
              {message.sources.length > 0 && (
                <Stack
                  direction={'row'}
                  spacing={'10px'}
                  key={crypto.randomUUID()}
                  sx={{ flexWrap: 'wrap', marginBottom: '' }}
                >
                  <p>Sources: </p>
                  <Stack
                    direction={'column'}
                    spacing={'5px'}
                    key={crypto.randomUUID()}
                    sx={{
                      flexWrap: 'wrap',
                      justifyContent: 'flex-start',
                      marginBottom: 'px'
                    }}
                  >
                    {message.sources.map((source) => (
                      <StyledLink
                        key={crypto.randomUUID()}
                        data-cy="source-link"
                        href={source.link}
                        target="_blank"
                        rel="external"
                      >
                        {source.isin} {source.shortname}
                      </StyledLink>
                    ))}
                  </Stack>
                </Stack>
              )}
            </BotMessageBubble>
          ) : (
            <UserMessageBubble
              data-cy="user-input-message"
              key={crypto.randomUUID()}
            >
              {message.text}
            </UserMessageBubble>
          )}
        </>
      );
    }
  });

  useEffect(() => {
    const bottom = document.getElementById('bottom');
    bottom?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  return (
    <>
      <Stack
        sx={{
          padding: '20px',
          width: '60vw',
          height: '60vh',
          gap: '10px',
          borderRadius: '10px',
          backgroundColor: 'white',
          overflowY: 'scroll',
          overflowX: 'hidden'
        }}
      >
        {messages}
        <div id="bottom" />{' '}
      </Stack>
    </>
  );
};
