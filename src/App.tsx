import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthLayout } from './components/auth/AuthLayout';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { HomePage } from './views/HomePage';
import { LoginPage } from './views/LoginPage';
import { PDFPage } from './views/PDFPage';

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
        <Route
          path="/pdf-view"
          element={
            <ProtectedRoute>
              <PDFPage />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
}

export default App;
