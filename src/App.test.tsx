import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

it('renders Home page', () => {
  render(<App />);
  expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
});
