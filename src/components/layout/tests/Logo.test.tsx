import React from 'react';

import { render, screen } from '@testing-library/react';

import Logo from '../Logo';

describe(Logo, () => {
  it('displays image and text', () => {
    render(<Logo />);

    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByText('Lore Cards')).toBeInTheDocument();
  });
});
