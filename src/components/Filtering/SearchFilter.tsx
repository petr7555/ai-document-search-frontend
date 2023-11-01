import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Filters } from '../../types/filterTypes';

interface SearchFilterProps {
  options: string[];
  label: string;
  handleSelect: (option: string[], filter: string) => void;
  activeFilters: Filters[];
}

export default function SearchFilter({
  options,
  label,
  handleSelect,
  activeFilters
}: SearchFilterProps) {
  return (
    <Autocomplete
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        flexWrap: 'wrap'
      }}
      multiple
      id="tags-outlined"
      options={options}
      value={
        activeFilters.filter((filter) => filter.property_name === label)[0]
          .values
      }
      onChange={(event, newValue) => {
        event?.preventDefault();
        handleSelect(newValue, label);
      }}
      getOptionLabel={(option) => option}
      filterSelectedOptions
      renderInput={(params) => (
        <TextField {...params} label={label} placeholder={label} />
      )}
    />
  );
}
