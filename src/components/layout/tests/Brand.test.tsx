import React from 'react';

import { render, screen } from '@testing-library/react';

import Brand from '../Brand';

describe(Brand, () => {
  it('displays text and initials with no image', () => {
    render(<Brand text='Some Text' />);

    expect(screen.getByText('Some Text')).toBeInTheDocument();
    expect(screen.getByText('So')).toBeInTheDocument(); // initials and full text
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('displays text and icon component when src provided', () => {
    render(<Brand renderIcon={() => <img src='fake' />} text='Some Text' />);

    expect(screen.getByRole('img')).toHaveAttribute('src', 'fake');
    expect(screen.getByText('Some Text')).toBeInTheDocument();
  });
});
