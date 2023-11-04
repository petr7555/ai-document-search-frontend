import * as React from 'react';
import { FC } from 'react';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { Checkbox } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Filter } from '../../../api/askQuestion';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface Props {
  options: string[];
  label: string;
  handleSelect: (values: string[], filter: string) => void;
  activeFilters: Filter[];
}

const SearchFilter: FC<Props> = ({
  options,
  label,
  handleSelect,
  activeFilters
}) => {
  return (
    <Autocomplete
      data-cy="filtering-autocomplete"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        flexWrap: 'wrap'
      }}
      multiple
      id="tags-outlined"
      onChange={(_event, newValue) => {
        handleSelect(newValue, label);
      }}
      value={
        activeFilters.find((filter) => filter.property_name === label)?.values
      }
      options={options}
      getOptionLabel={(option) => option}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            sx={{ marginRight: 8 }}
            checked={selected}
          />
          {option}
        </li>
      )}
      renderInput={(params) => (
        <TextField
          data-cy="filtering-searchfield"
          {...params}
          label={label}
          placeholder={label}
        />
      )}
    />
  );
};

export default SearchFilter;
