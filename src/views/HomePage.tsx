import React from 'react';
import { CenterPageContent } from '../components/CenterPageContent';
import { Chatbot } from '../components/Chatbot/Chatbot';
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
