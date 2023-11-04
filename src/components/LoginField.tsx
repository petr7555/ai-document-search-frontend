import React, { ChangeEvent, useState } from 'react';
import TextField from '@mui/material/TextField';

type Props = {
  label: string;
  type: string;
  autoComplete: string;
  value: string;
  onChange: (value: string) => void;
};

const LoginField = ({ label, type, autoComplete, value, onChange }: Props) => {
  const [error, setError] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    onChange(newValue);
    if (newValue.length === 0) {
      setError(`${label} is required`);
    } else {
      setError('');
    }
  };

  return (
    <TextField
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
