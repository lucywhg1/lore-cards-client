import Faker from 'faker';
import React from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import NavButton from '../NavButton';

const mockOnClick = jest.fn();

describe(NavButton, () => {
  const text = Faker.company.bsNoun();

  const renderComponent = (icon?: React.ReactNode): void => {
    render(<NavButton icon={icon} text={text} onClick={mockOnClick} />);
  };

  it('displays text', () => {
    renderComponent();

    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it('displays icon image if provided', () => {
    const img = <img src='fake' />;
    renderComponent(img);

    expect(screen.getByRole('img')).toHaveAttribute('src', 'fake');
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
