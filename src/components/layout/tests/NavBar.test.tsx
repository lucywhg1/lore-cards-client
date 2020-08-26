import NavBar from '../NavBar';
import { render, screen } from '@testing-library/react';
import React from 'react';

describe(NavBar, () => {
  beforeEach(() => {
    render(<NavBar />);
  });

  it('displays logo, brand, and search', () => {
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByText('Lore Cards')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
});
