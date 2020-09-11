import Faker from 'faker';
import React from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import NavButton from '../NavButton';

const mockOnClick = jest.fn();

describe(NavButton, () => {
  const text = Faker.company.bsNoun();
  const iconSrc = Faker.image.imageUrl();

  beforeEach(() => {
    render(<NavButton iconSrc={iconSrc} text={text} onClick={mockOnClick} />);
  });

  it('displays text', () => {
    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it('displays icon image', () => {
    expect(screen.getByRole('img')).toHaveAttribute('src', iconSrc);
  });

  it('invokes #onClick', () => {
    userEvent.click(screen.getByText(text));

    expect(mockOnClick).toHaveBeenCalled();
  });
});
