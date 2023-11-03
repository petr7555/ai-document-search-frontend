import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthLayout } from './components/auth/AuthLayout';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { ChatPage } from './pages/ChatPage';
import { LoginPage } from './pages/LoginPage';

function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
}

export default App;
