import React from 'react';

import { render, screen } from '@testing-library/react';

import Icon from '../Icon';

describe(Icon, () => {
  it('displays text and initials with no image', () => {
    render(<Icon text='Some Text' />);

    expect(screen.getByText('Some Text')).toBeInTheDocument();
    expect(screen.getByText('So')).toBeInTheDocument(); // initials and full text
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('displays text and image when src provided', () => {
    render(<Icon src='fake' text='Some Text' />);

    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByText('Some Text')).toBeInTheDocument();
  });
});
