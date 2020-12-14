import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders App', async () => {
  render(<App />);
  const mastElement = screen.getByText(/Story-Share/i);
  expect(mastElement).toBeInTheDocument();

  const storyPreview = screen.getByTestId("story-preview");
  expect(storyPreview).toBeInTheDocument();

//   const els = await screen.findAllByTestId("story-para")
  screen.debug();
});