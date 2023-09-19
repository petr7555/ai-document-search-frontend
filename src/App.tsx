import React from 'react';
import BackendHealthCheck from './components/BackendHealthCheck';
import { LoginPage } from './views/LoginPage';
import { Navbar } from './components/Navbar';

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
