import Dashboard from '../Dashboard';
import React from 'react';
import { render, screen } from '@testing-library/react';

describe(Dashboard, () => {
  beforeEach(() => {
    render(<Dashboard />);
  });

  it('has a sidebar', () => {
    expect(screen.getByRole('button', { name: /All/ })).toBeInTheDocument();
  });
});
