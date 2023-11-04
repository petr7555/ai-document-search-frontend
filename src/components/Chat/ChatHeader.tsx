import React, { FC } from 'react';
import AddIcon from '@mui/icons-material/Add';
import LoadingButton from '@mui/lab/LoadingButton';
import { Alert, Stack } from '@mui/material';
import { Conversation } from '../../api/getLatestConversation';

type Props = {
  gettingLatestConversation: boolean;
  creatingNewConversation: boolean;
  askingQuestion: boolean;
  conversation?: Conversation;
  createNewConversation: () => void;
};

const ChatHeader: FC<Props> = ({
  gettingLatestConversation,
  creatingNewConversation,
  askingQuestion,
  conversation,
  createNewConversation
}) => {
  return (
    <Stack
      direction="row"
      spacing={4}
      alignItems="stretch"
      justifyContent="space-between"
      sx={{
        p: 1,
        boxShadow: '0px 10px 10px rgba(0, 0, 0, 0.1)',
        zIndex: 1
      }}
    >
      <Alert
        severity={
          gettingLatestConversation || creatingNewConversation
            ? 'info'
            : conversation
            ? 'success'
            : 'error'
        }
      >
        {gettingLatestConversation || creatingNewConversation
          ? 'Conversation is loading...'
          : conversation
          ? `Conversation started on ${new Date(
              conversation.created_at
            ).toLocaleDateString()} at ${new Date(
              conversation.created_at
            ).toLocaleTimeString()}.`
          : 'No conversation.'}
      </Alert>
      <LoadingButton
        aria-label="New conversation"
        onClick={createNewConversation}
        startIcon={<AddIcon />}
        loading={creatingNewConversation}
        loadingPosition="start"
        variant="contained"
        disabled={gettingLatestConversation || askingQuestion}
      >
        New conversation
      </LoadingButton>
    </Stack>
  );
};

export default ChatHeader;
