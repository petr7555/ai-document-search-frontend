import { FC } from 'react';
import { Alert, Snackbar } from '@mui/material';
import useError from '../hooks/useError';

const ApiErrorSnackbar: FC = () => {
  const [error, setError] = useError();

  const closeErrorSnackbar = () => {
    setError('');
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      sx={{ marginTop: 7 }}
      autoHideDuration={4000}
      open={Boolean(error)}
      onClose={closeErrorSnackbar}
    >
      <Alert
        data-cy="api-error-snackbar"
        severity="error"
        sx={{ backgroundColor: 'grey.800', color: 'white' }}
      >
        {error}
      </Alert>
    </Snackbar>
  );
};

export default ApiErrorSnackbar;
