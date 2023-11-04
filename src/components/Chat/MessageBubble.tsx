import React, { FC } from 'react';
import { Paper, Typography } from '@mui/material';
import { Message } from '../../api/getLatestConversation';
import { BOT_MESSAGE_COLOR, USER_MESSAGE_COLOR } from '../../utils/constants';
import BouncingDots from './BouncingDots';
import Sources from './Sources';

type Props = {
  message: Message;
};

const borderRadius = '10px';

const MessageBubble: FC<Props> = ({ message }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        padding: 2,
        backgroundColor: message.is_from_bot
          ? BOT_MESSAGE_COLOR
          : USER_MESSAGE_COLOR,
        borderRadius,
        borderBottomRightRadius: message.is_from_bot ? borderRadius : '0px',
        borderBottomLeftRadius: message.is_from_bot ? '0px' : borderRadius,
        alignSelf: message.is_from_bot ? 'flex-start' : 'flex-end'
      }}
    >
      {message.is_from_bot && message.text === '...' ? (
        <BouncingDots />
      ) : (
        <>
          <Typography>{message.text}</Typography>
          <Sources sources={message.sources}></Sources>
        </>
      )}
    </Paper>
  );
};

export default MessageBubble;
