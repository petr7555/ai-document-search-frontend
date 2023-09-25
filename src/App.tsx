import React from 'react';
import BackendHealthCheck from './components/BackendHealthCheck';
import { Navbar } from './components/Navbar/Navbar';
import { LoginPage } from './views/LoginPage';

function App() {
  return (
    <>
      <Navbar />
      <LoginPage />
      <BackendHealthCheck />
    </>
  );
}

export default App;
