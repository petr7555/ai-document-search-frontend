import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthLayout } from './layouts/AuthLayout';
import { HomePage } from './views/HomePage';
import { LoginPage } from './views/LoginPage';
import { ProtectedRoute } from './ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
}

export default App;
