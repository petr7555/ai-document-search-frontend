import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { Link, Paper, Stack } from '@mui/material';
import theme from '../../themes/theme';
import { BouncingLoader } from '../BouncingDotsLoader';
import { Message } from './Chatbot';

const StyledLink = styled(Link)(() => ({
  color: `${theme.palette.primary.main}`,
  textDecoration: 'underline',
  textunderlineoffset: '2px',
  marginBottom: '8px',
  '&:hover': {
    color: `${theme.palette.primary.dark}`
  }
}));

const MessageBubble = styled(Paper)(
  ({ originBot, error }: { originBot: boolean; error: boolean }) => ({
    maxWidth: '80%',
    minHeight: 'fit-content',
    borderRadius: originBot ? '10px 10px 10px 0px' : '10px 10px 0px 10px',
    textAlign: originBot ? 'left' : 'right',
    alignItems: 'flex-start',
    gap: '5px',
    margin: '2px',
    padding: '0px 20px 0px 20px',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    fontSize: '16px',
    fontWeight: 500,
    backgroundColor: originBot ? '#e0e0e0' : '#b3d4fc',
    alignSelf: originBot ? 'flex-start' : 'flex-end',
    color: error ? 'red' : 'black',
    textUnderlineOffset: '2px'
  })
);

export const ConversationLayout = ({
  conversation,
  loading
}: {
  conversation: Message[];
  loading: boolean;
}) => {
  const messages = conversation.map((message) => {
    if (loading && message.originBot && message.text === '...') {
      return (
        <MessageBubble
          data-cy="chatbot-response-message"
          originBot={message.originBot}
          key={message.text}
          error={false}
        >
          <BouncingLoader>
            <div />
            <div />
            <div />
          </BouncingLoader>
        </MessageBubble>
      );
    } else {
      return (
        <MessageBubble
          data-cy={
            message.originBot
              ? 'chatbot-response-message'
              : 'user-input-message'
          }
          originBot={message.originBot}
          error={message.error ?? false}
        >
          <p>{message.text}</p>
          {message.sources && (
            <Stack
              direction={'row'}
              spacing={'10px'}
              sx={{ flexWrap: 'wrap', marginBottom: '10px' }}
            >
              <p>Sources: </p>
              <Stack
                direction={'column'}
                spacing={'5px'}
                sx={{
                  flexWrap: 'wrap',
                  justifyContent: 'flex-start',
                  marginBottom: 'px'
                }}
              >
                {message.sources.map((source) => (
                  <StyledLink
                    data-cy="source-link"
                    href={source.link}
                    target="_blank"
                    rel="external"
                  >
                    {source.shortname}
                  </StyledLink>
                ))}
              </Stack>
            </Stack>
          )}
        </MessageBubble>
      );
    }
  });

  useEffect(() => {
    const bottom = document.getElementById('bottom');
    bottom?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  return (
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
      <div id="bottom" />
    </Stack>
  );
};
