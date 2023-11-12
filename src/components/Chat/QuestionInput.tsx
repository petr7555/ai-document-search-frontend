import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import TuneIcon from '@mui/icons-material/Tune';
import { Box, Tooltip } from '@mui/material';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import { Filter } from '../../api/askQuestion';
import { Filters, getFilters as getFiltersApi } from '../../api/getFilters';
import useError from '../../hooks/useError';
import FilterDialog from './Filtering/FilterDialog';

type Props = {
  onQuestionAsked: (text: string, filters: Filter[]) => void;
  disabled: boolean;
};
const QuestionInput: FC<Props> = ({ onQuestionAsked, disabled }) => {
  const [, setError] = useError();

  // Input
  const [input, setInput] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const canSendMessage = input.trim().length > 0 && !disabled;
  const handleSubmit = () => {
    if (canSendMessage) {
      onQuestionAsked(input, filters);
      setInput('');
    }
  };

  // Filters
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [filterOptions, setFilterOptions] = useState<Filters>();
  const [filters, setFilters] = useState<Filter[]>([]);

  const openFilterDialog = () => setIsFilterDialogOpen((open) => !open);
  const handleFiltersChanged = (newFilters: Filter[]) => {
    setFilters(newFilters);
  };

  useEffect(() => {
    const getFilters = async () => {
      const response = await getFiltersApi();
      if (response.ok) {
        const filters = response.data;
        setFilterOptions(filters);
        setFilters(
          Object.keys(filters).map((key) => ({
            property_name: key as keyof Filters,
            values: []
          }))
        );
      } else {
        setError(response.detail);
      }
    };

    getFilters();
  }, [setError]);

  return (
    <>
      <Box
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          boxShadow: '0px -10px 10px rgba(0, 0, 0, 0.1)'
        }}
      >
        <Tooltip placement="top" title="Filter results">
          <Box>
            <IconButton
              onClick={openFilterDialog}
              sx={{ p: '10px' }}
              color="primary"
              disabled={!filterOptions}
            >
              <TuneIcon />
            </IconButton>
          </Box>
        </Tooltip>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <InputBase
          data-cy="question-input"
          sx={{ ml: 1, flex: 1 }}
          value={input}
          onChange={handleInputChange}
          placeholder="Ask a question"
          multiline
          maxRows={5}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              if (!e.shiftKey) {
                handleSubmit();
              } else {
                setInput((input) => input + '\n');
              }
            }
          }}
        />
        <IconButton
          data-cy="send-button"
          sx={{ p: '10px' }}
          aria-label="Send"
          disabled={!canSendMessage}
          color="primary"
          onClick={handleSubmit}
        >
          <SendIcon />
        </IconButton>
      </Box>
      {filterOptions && (
        <FilterDialog
          open={isFilterDialogOpen}
          handleClose={() => setIsFilterDialogOpen(false)}
          filterOptions={filterOptions}
          filters={filters}
          onFiltersChanged={handleFiltersChanged}
        />
      )}
    </>
  );
};

export default QuestionInput;
