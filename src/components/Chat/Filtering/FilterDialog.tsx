import React, { FC, useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack
} from '@mui/material';
import { Filter } from '../../../api/askQuestion';
import { Filters } from '../../../api/getFilters';
import FilterAutocomplete from './FilterAutocomplete';

interface Props {
  open: boolean;
  handleClose: () => void;
  onFiltersChanged: (newFilters: Filter[]) => void;
  filters: Filter[];
  filterOptions: Filters;
}

const FilterDialog: FC<Props> = ({
  open,
  handleClose,
  filterOptions,
  filters,
  onFiltersChanged
}) => {
  const [newFilters, setNewFilters] = useState<Filter[]>(filters);

  useEffect(() => {
    setNewFilters(filters);
  }, [filters]);

  const handleResetAllFilters = () => {
    setNewFilters(
      Object.keys(filterOptions).map((key) => ({
        property_name: key as keyof Filters,
        values: []
      }))
    );
  };

  const handleCancel = () => {
    setNewFilters(filters);
    handleClose();
  };

  const handleSave = () => {
    onFiltersChanged(newFilters);
    handleClose();
  };

  const handleFilterChanged = (propertyName: string, newValues: string[]) => {
    setNewFilters(
      newFilters.map((filter) => {
        if (filter.property_name === propertyName) {
          return {
            ...filter,
            values: newValues
          };
        } else {
          return filter;
        }
      })
    );
  };

  return (
    <Dialog
      onClose={handleCancel}
      aria-labelledby="filter-dialog-title"
      open={open}
      fullWidth
    >
      <DialogTitle id="filter-dialog-title">Filters</DialogTitle>
      <DialogContent dividers>
        <Stack direction="column" spacing={2}>
          {Object.entries(filterOptions).map(([key, options]) => {
            return (
              <FilterAutocomplete
                key={key}
                label={key}
                options={options}
                values={
                  newFilters.find((filter) => filter.property_name === key)
                    ?.values ?? []
                }
                onSelected={(newValues) => handleFilterChanged(key, newValues)}
              />
            );
          })}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleResetAllFilters}>Reset all filters</Button>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">
          Save filters
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FilterDialog;
