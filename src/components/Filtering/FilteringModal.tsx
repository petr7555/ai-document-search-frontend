import React, { Dispatch, SetStateAction } from 'react';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Divider, IconButton, Modal, Stack, Typography } from '@mui/material';
import { Filter, Filters } from '../../types/filterTypes';
import SearchFilter from './SearchFilter';

interface FilteringModalProps {
  open: boolean;
  handleClose: () => void;
  setActiveFilters: Dispatch<SetStateAction<Filter[]>>;
  activeFilters: Filter[];
  filterOptions: Filters;
}

export const FilteringModal = ({
  open,
  handleClose,
  setActiveFilters,
  activeFilters,
  filterOptions
}: FilteringModalProps) => {
  const handleSelect = (values: string[], label: string) => {
    setActiveFilters((prev) => {
      return prev.map((filter) => {
        if (filter.property_name === label) {
          return {
            ...filter,
            values: values
          };
        } else {
          return filter;
        }
      });
    });
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      data-cy="filtering-modal"
    >
      <Stack
        spacing={2}
        direction={'column'}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: '10px'
        }}
      >
        <Stack direction={'column'} spacing={1}>
          <Stack
            direction={'row'}
            sx={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Filtering Options
            </Typography>
            <IconButton data-cy="exit-modal-button" onClick={handleClose}>
              <CloseOutlinedIcon />
            </IconButton>
          </Stack>

          <Divider />
        </Stack>
        <Stack
          direction={'column'}
          spacing={4}
          sx={{ paddingTop: '10px' }}
          key={crypto.randomUUID()}
        >
          {Object.keys(filterOptions).map((key) => {
            return (
              <SearchFilter
                key={crypto.randomUUID()}
                options={filterOptions[key as keyof Filters]}
                label={key}
                handleSelect={handleSelect}
                activeFilters={activeFilters}
              />
            );
          })}
        </Stack>
      </Stack>
    </Modal>
  );
};
