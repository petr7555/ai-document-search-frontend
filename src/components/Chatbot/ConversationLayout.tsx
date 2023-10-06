import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { Paper, Stack } from '@mui/material';
import { BouncingLoader } from '../BouncingDotsLoader';
import { Message } from './Chatbot';

const MessageBubble = styled(Paper)(
  ({
    originBot,
    error,
    link
  }: {
    originBot: boolean;
    error: boolean;
    link: string | undefined;
  }) => ({
    maxWidth: '80%',
    minHeight: 'fit-content',
    borderRadius: originBot ? '10px 10px 10px 0px' : '10px 10px 0px 10px',
    textAlign: originBot ? 'left' : 'right',
    alignItems: 'flex-start',
    gap: '5px',
    margin: '2px',
    padding: link ? '0px 20px 10px 20px' : '0px 20px 0px 20px',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    fontSize: '16px',
    fontWeight: 500,
    backgroundColor: originBot ? '#e0e0e0' : '#b3d4fc',
    alignSelf: originBot ? 'flex-start' : 'flex-end',
    color: error ? 'red' : 'black',
    textDecoration: error ? 'underline' : 'none',
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
          link={undefined}
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
          link={message.link}
        >
          <p>{message.text}</p>
          {message.link ? (
            <a href={message.link} target="_blank" rel="external">
              Source: {message.link.split('/')[2]}
            </a>
          ) : null}
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
