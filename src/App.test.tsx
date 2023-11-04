import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

it('shows login page', () => {
  render(<App />);
  expect(screen.getByText('Log in')).toBeInTheDocument();
});
