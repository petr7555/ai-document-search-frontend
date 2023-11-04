import React, { FC } from 'react';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import PreviewIcon from '@mui/icons-material/Preview';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Stack,
  Tooltip
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Source } from '../../api/getLatestConversation';
import DividerWithText from './DividerWithText';

type Props = {
  sources: Source[] | null;
  onPdfPreviewSrcChanged: (src: string) => void;
};
const Sources: FC<Props> = ({ sources, onPdfPreviewSrcChanged }) => {
  if (!sources || sources.length === 0) {
    return null;
  }
  return (
    <Box sx={{ mt: 1 }}>
      <DividerWithText>Sources:</DividerWithText>
      <List sx={{ p: 0 }} dense>
        {sources.map((source) => {
          const pageNumber = source.page + 1;
          const src = `${source.link}#page=${pageNumber}`;
          return (
            <ListItem
              key={crypto.randomUUID()}
              secondaryAction={
                <Stack direction="row" spacing={2}>
                  <Tooltip placement="top" title="Open PDF in new tab">
                    <IconButton
                      aria-label="Open PDF in new tab"
                      href={src}
                      target="_blank"
                      edge="end"
                    >
                      <OpenInNewIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip placement="top" title="Preview PDF">
                    <IconButton
                      aria-label="Preview PDF"
                      onClick={() => {
                        onPdfPreviewSrcChanged(src);
                      }}
                      edge="end"
                    >
                      <PreviewIcon />
                    </IconButton>
                  </Tooltip>
                </Stack>
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
