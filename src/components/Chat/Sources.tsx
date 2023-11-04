import React, { FC } from 'react';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Box, List, ListItem, ListItemText, Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Source } from '../../api/getLatestConversation';
import DividerWithText from './DividerWithText';

type Props = {
  sources: Source[] | null;
};
const Sources: FC<Props> = ({ sources }) => {
  if (!sources || sources.length === 0) {
    return null;
  }
  return (
    <Box sx={{ mt: 1 }}>
      <DividerWithText>Sources:</DividerWithText>
      <List sx={{ p: 0 }} dense>
        {sources.map((source) => {
          const pageNumber = source.page + 1;
          return (
            <ListItem
              key={crypto.randomUUID()}
              secondaryAction={
                <Tooltip placement="top" title="Open PDF in new tab">
                  <IconButton
                    aria-label="Open PDF in new tab"
                    href={`${source.link}#page=${pageNumber}`}
                    target="_blank"
                    edge="end"
                  >
                    <OpenInNewIcon />
                  </IconButton>
                </Tooltip>
              }
            >
              <ListItemText
                primary={`${source.isin} ${source.shortname}`}
                secondary={`Page ${pageNumber}`}
              />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default Sources;
