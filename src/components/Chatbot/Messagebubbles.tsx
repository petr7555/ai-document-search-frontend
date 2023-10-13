import styled from '@emotion/styled';
import { Paper } from '@mui/material';
import { PaperProps } from '@mui/material/Paper';

interface BotmessageProps extends PaperProps {
  error?: boolean;
}

export const UserMessageBubble = styled(Paper)(() => ({
  maxWidth: '80%',
  minHeight: 'fit-content',
  borderRadius: '10px 10px 0px 10px',
  textAlign: 'right',
  alignItems: 'flex-start',
  gap: '12px',
  margin: '2px',
  padding: '12px 20px 12px 20px',
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'column',
  fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
  fontSize: '16px',
  fontWeight: 500,
  backgroundColor: '#b3d4fc',
  alignSelf: 'flex-end',
  textUnderlineOffset: '2px'
}));

export const BotMessageBubble = styled(UserMessageBubble)<BotmessageProps>(
  ({ error }) => ({
    borderRadius: '10px 10px 10px 0px',
    textAlign: 'left',
    backgroundColor: '#e0e0e0',
    alignSelf: 'flex-start',
    color: error ? 'red' : 'black'
  })
);
