import Faker from 'faker';
import React from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CategoryFactory } from '../../../factories';
import CategoryButton from '../CategoryButton';

const mockOnClick = jest.fn();

describe(CategoryButton, () => {
  const category = CategoryFactory.build();

  beforeEach(() => {
    render(<CategoryButton category={category} onClick={mockOnClick} />);
  });

  it('displays category name', () => {
    expect(screen.getByText(category.name)).toBeInTheDocument();
  });

  it('invokes #onClick', () => {
    userEvent.click(screen.getByText(category.name));

    expect(mockOnClick).toHaveBeenCalled();
  });
});
