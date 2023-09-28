import React from 'react';
import { Navbar } from '../components/Navbar/Navbar';
import { ChatbotPage } from './ChatbotPage';

export const HomePage = () => {
  return (
    <>
      <Navbar />
      <ChatbotPage />
    </>
  );
};

export default HomePage;
