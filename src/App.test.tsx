import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders server health', () => {
  render(<App />);
  expect(screen.getByText(/connection to backend/i)).toBeInTheDocument();
});
