import React from 'react';
import { Chatbot } from '../components/Chatbot/Chatbot';
import { CenterPageContent } from '../components/Layout/CenterPageContent';
import { Navbar } from '../components/Navbar/Navbar';

export const HomePage = () => {
  return (
    <>
      <Navbar />
      <CenterPageContent>
        <Chatbot />
      </CenterPageContent>
    </>
  );
};

export default HomePage;
