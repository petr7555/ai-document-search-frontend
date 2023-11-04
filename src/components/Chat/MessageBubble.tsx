import React, { FC } from 'react';
import { Paper, Typography } from '@mui/material';
import { Message } from '../../api/getLatestConversation';
import { BOT_MESSAGE_COLOR, USER_MESSAGE_COLOR } from '../../utils/constants';
import BouncingDots from './BouncingDots';
import Sources from './Sources';

const borderRadius = '10px';

type Props = {
  message: Message;
  onPdfPreviewSrcChanged: (src: string) => void;
};

const MessageBubble: FC<Props> = ({ message, onPdfPreviewSrcChanged }) => {
  return (
    <Paper
      data-cy={`${message.is_from_bot ? 'bot' : 'user'}-message-bubble`}
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
          <Sources
            sources={message.sources}
            onPdfPreviewSrcChanged={onPdfPreviewSrcChanged}
          ></Sources>
        </>
      )}
    </Paper>
  );
};

export default MessageBubble;
