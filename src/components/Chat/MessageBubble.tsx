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
      data-cy={`${message.role}-message-bubble`}
      elevation={3}
      sx={{
        padding: 2,
        backgroundColor:
          message.role === 'user' ? USER_MESSAGE_COLOR : BOT_MESSAGE_COLOR,
        borderRadius,
        borderBottomRightRadius: message.role === 'user' ? '0px' : borderRadius,
        borderBottomLeftRadius: message.role === 'user' ? borderRadius : '0px',
        alignSelf: message.role === 'user' ? 'flex-end' : 'flex-start'
      }}
    >
      {message.role === 'pending' ? (
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
