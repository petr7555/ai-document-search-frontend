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
import FilterModal from './Filtering/FilterModal';

type Props = {
  onQuestionAsked: (text: string, filters: Filter[]) => void;
  disabled: boolean;
};
const QuestionInput: FC<Props> = ({ onQuestionAsked, disabled }) => {
  const [, setError] = useError();

  const [input, setInput] = useState('');

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filterOptions, setFilterOptions] = useState<Filters>();
  const [filters, setFilters] = useState<Filter[]>([]);

  const openFilterModal = () => setIsFilterModalOpen((open) => !open);

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
        <Tooltip
          placement="top"
          title="Filter results"
          sx={{ fontSize: '5rem' }}
        >
          <IconButton
            data-cy="chatbot-filter-button"
            onClick={openFilterModal}
            sx={{ p: '10px' }}
            aria-label="Filter"
            color="primary"
          >
            <TuneIcon />
          </IconButton>
        </Tooltip>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <InputBase
          data-cy="chatbot-input-field"
          sx={{ ml: 1, flex: 1 }}
          value={input}
          onChange={handleInputChange}
          placeholder="Ask a question"
          inputProps={{ 'aria-label': 'Ask a question' }}
          multiline
          maxRows={5}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
        />
        <IconButton
          data-cy="chatbot-send-button"
          // type="submit"
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
        <FilterModal
          open={isFilterModalOpen}
          handleClose={() => setIsFilterModalOpen(false)}
          filterOptions={filterOptions}
          setActiveFilters={setFilters}
          activeFilters={filters}
        />
      )}
    </>
  );
};

export default QuestionInput;
