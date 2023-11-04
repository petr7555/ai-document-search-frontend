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
        maxWidth="lg"
        component="main"
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'background.default'
        }}
      >
        {children}
      </Container>
    </>
  );
};

export default Layout;
