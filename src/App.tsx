import React from 'react';
import BackendHealthCheck from './components/BackendHealthCheck';
import { LoginPage } from './views/LoginPage';

function App() {
  return (
    <>
      <LoginPage />
      <BackendHealthCheck />
    </>
  );
}

export default App;
