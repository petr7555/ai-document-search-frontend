import { FC, ReactNode } from 'react';
import { Container } from '@mui/material';
import ApiErrorSnackbar from './ApiErrorSnackbar';
import NavigationBar from './NavigationBar';

type Props = {
  children: ReactNode;
};

const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <NavigationBar />
      <ApiErrorSnackbar />
      <Container
        component="main"
        maxWidth={false}
        sx={{
          pt: 12,
          pb: 2,
          minHeight: '100vh',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'background.default'
        }}
      >
        {children}
      </Container>
    </>
  );
};

export default Layout;
