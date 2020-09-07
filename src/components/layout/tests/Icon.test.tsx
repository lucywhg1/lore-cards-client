import React from 'react';

import { render, screen } from '@testing-library/react';

import Icon from '../Icon';

describe(Icon, () => {
  it('displays image and text', () => {
    render(<Icon src='fake src' text='Some Text' />);

    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByText('Some Text')).toBeInTheDocument();
    expect(screen.getByText('Lore Cards')).toBeInTheDocument();
  });
});
