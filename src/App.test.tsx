import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import App from './App';

test('shows login page', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  expect(screen.getByText('Log in')).toBeInTheDocument();
});
