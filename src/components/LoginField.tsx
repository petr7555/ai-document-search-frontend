import React, { ChangeEvent } from 'react';
import TextField from '@mui/material/TextField';

type Props = {
  label: string;
  type: string;
  autoComplete: string;
  value: string;
  onChange: (value: string) => void;
  touched: boolean;
  onTouched: (touched: boolean) => void;
};

const LoginField = ({
  label,
  type,
  autoComplete,
  value,
  onChange,
  touched,
  onTouched
}: Props) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onTouched(true);
    onChange(event.target.value);
  };

  const error = touched && value.length === 0 ? `${label} is required` : '';

  return (
    <TextField
      data-cy={`${label.toLowerCase()}-field`}
      inputProps={{ 'data-cy': `${label.toLowerCase()}-input` }}
      variant="standard"
      label={label}
      type={type}
      autoComplete={autoComplete}
      value={value}
      onChange={handleChange}
      error={!!error}
      helperText={error}
    />
  );
};

export default LoginField;
