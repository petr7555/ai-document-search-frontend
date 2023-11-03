import React from 'react';
import { Chatbot } from '../components/Chatbot/Chatbot';
import { CenterPageContent } from '../components/Layout/CenterPageContent';
import { Navbar } from '../components/Navbar/Navbar';
import usePageTitle from '../hooks/usePageTitle';

export const ChatPage = () => {
  usePageTitle('Chat');

  return (
    <>
      <Navbar />
      <CenterPageContent>
        <Chatbot />
      </CenterPageContent>
    </>
  );
};

export default ChatPage;
