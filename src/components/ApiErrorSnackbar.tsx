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
      open={Boolean(error.error)}
      autoHideDuration={error.autoHide ? 4000 : null}
      onClose={closeErrorSnackbar}
      ClickAwayListenerProps={{ onClickAway: () => null }}
    >
      <Alert
        data-cy="api-error-snackbar"
        severity="error"
        sx={{ backgroundColor: 'grey.800', color: 'white' }}
        onClose={error.autoHide ? undefined : closeErrorSnackbar}
      >
        {error.error}
      </Alert>
    </Snackbar>
  );
};

export default ApiErrorSnackbar;
