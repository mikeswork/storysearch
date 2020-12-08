import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders App', () => {
  render(<App />);
  const mastElement = screen.getByText(/Story-Share/i);
  expect(mastElement).toBeInTheDocument();
});
