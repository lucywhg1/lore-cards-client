import Faker from 'faker';
import React from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import NavButton from '../NavButton';

const mockOnClick = jest.fn();

describe(NavButton, () => {
  const text = Faker.company.bsNoun();

  const renderComponent = (iconSrc?: string): void => {
    render(<NavButton iconSrc={iconSrc} text={text} onClick={mockOnClick} />);
  };

  it('displays text', () => {
    renderComponent();

    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it('displays icon image if provided', () => {
    const imgUrl = Faker.image.imageUrl();
    renderComponent(imgUrl);

    expect(screen.getByRole('img')).toHaveAttribute('src', imgUrl);
  });

  it('displays icon initials if not provided', () => {
    renderComponent();

    expect(screen.getByText(text.substr(0, 2)));
  });

  it('invokes #onClick', () => {
    renderComponent();
    userEvent.click(screen.getByText(text));

    expect(mockOnClick).toHaveBeenCalled();
  });
});
