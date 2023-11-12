import React, { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ChatPage from '../pages/ChatPage';
import LoginPage from '../pages/LoginPage';
import { CHAT_PATH, LOGIN_PATH } from '../utils/constants';
import ProtectedRoute from './ProtectedRoute';

const RoutesSwitch: FC = () => (
  <Routes>
    <Route path={LOGIN_PATH} element={<LoginPage />} />
    <Route
      path={CHAT_PATH}
      element={
        <ProtectedRoute>
          <ChatPage />
        </ProtectedRoute>
      }
    />
    <Route path="*" element={<Navigate replace to={CHAT_PATH} />} />
  </Routes>
);

export default RoutesSwitch;
