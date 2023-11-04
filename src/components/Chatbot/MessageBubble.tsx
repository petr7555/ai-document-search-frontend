import React, { FC } from 'react';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Message } from '../../api/getLatestConversation';
import { BOT_MESSAGE_COLOR, USER_MESSAGE_COLOR } from '../../utils/constants';
import BouncingDots from '../BouncingDots';
import DividerWithText from '../DividerWithText';

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
          {message.is_from_bot && message.sources.length > 0 && (
            <Box sx={{ mt: 1 }}>
              <DividerWithText>Sources:</DividerWithText>
              <List sx={{ p: 0 }} dense>
                {message.sources.map((source) => (
                  <ListItem
                    key={crypto.randomUUID()}
                    secondaryAction={
                      <IconButton
                        aria-label="Open PDF"
                        href={`${source.link}#page=${source.page + 1}`}
                        target="_blank"
                        edge="end"
                      >
                        <OpenInNewIcon />
                      </IconButton>
                    }
                  >
                    <ListItemText
                      primary={`${source.isin} ${source.shortname}`}
                      secondary={`Page ${source.page + 1}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </>
      )}
    </Paper>
  );
};

export default MessageBubble;
