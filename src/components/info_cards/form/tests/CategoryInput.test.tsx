import React from 'react';
import { render, screen, RenderResult } from '@testing-library/react';
import CategoryInput from '../CategoryInput';

import { emptyCategory } from '../../../../types/Category';

jest.mock('../../../../services/CategoryService', () => {
  return jest.fn().mockImplementation(() => {
    return { getAll: jest.fn().mockResolvedValue([]) };
  });
});

const mockOnChange = jest.fn();

describe(CategoryInput, () => {
  const renderComponent = async (): Promise<RenderResult> => {
    const result = render(
      <CategoryInput category={emptyCategory} onChange={mockOnChange} />
    );
    await screen.findAllByRole('option');

    return result;
  };

  it('displays label and CategorySelect', async () => {
    await renderComponent();

    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByTitle('Select category')).toBeInTheDocument();
  });

  it('displays errors', async () => {
    const { rerender } = await renderComponent();
    const requiredError = {
      id: { message: 'category is a required field', type: 'min' }
    };

    expect(
      screen.queryByTestId('category-select-errors')
    ).not.toBeInTheDocument();

    rerender(
      <CategoryInput
        category={emptyCategory}
        onChange={mockOnChange}
        errors={requiredError}
      />
    );

    expect(screen.getByText(requiredError.id.message)).toBeInTheDocument();
  });
});
