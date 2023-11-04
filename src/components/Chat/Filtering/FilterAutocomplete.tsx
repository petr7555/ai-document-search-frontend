import * as React from 'react';
import { FC, SyntheticEvent } from 'react';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { Box, Checkbox } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

interface Props {
  label: string;
  options: string[];
  values: string[];
  onSelected: (newValue: string[]) => void;
}

const FilterAutocomplete: FC<Props> = ({
  label,
  options,
  values,
  onSelected
}) => {
  const handleOnChange = (_event: SyntheticEvent, newValue: string[]) => {
    onSelected(newValue);
  };

  return (
    <Autocomplete
      multiple
      options={options}
      value={values}
      onChange={handleOnChange}
      renderOption={(props, option, { selected }) => (
        <Box component="li" {...props}>
          <Checkbox
            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
            checkedIcon={<CheckBoxIcon fontSize="small" />}
            sx={{ marginRight: 1 }}
            checked={selected}
          />
          {option}
        </Box>
      )}
      renderInput={(params) => (
        <TextField {...params} label={label} placeholder={label} />
      )}
    />
  );
};

export default FilterAutocomplete;
