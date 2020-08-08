import React, { ReactElement } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CategorySelect from '../CategorySelect';
import { Category } from '../../../../types';
import { CategoryFactory } from '../../../../factories';
import { toast as mockToast } from 'react-toastify';

const mockGetAll = jest.fn();
jest.mock('../../../../services/CategoryService', () => {
  return jest.fn().mockImplementation(() => {
    return { get: mockGetAll };
  });
});

const mockOnChange = jest.fn();

describe(CategorySelect, () => {
  const unselectedCategory: Category = { id: -1, name: '' };
  const availableCategories = CategoryFactory.buildList(2);

  let rerender: (ui: ReactElement) => void;

  const renderComponent = (): typeof rerender => {
    return render(
      <CategorySelect category={unselectedCategory} onChange={mockOnChange} />
    ).rerender;
  };

  describe('when category fetching fails', () => {
    it('displays error toast', async () => {
      mockGetAll.mockRejectedValue('Fetch failed.');

      renderComponent();

      await waitFor(() => expect(mockToast.error).toHaveBeenCalled());
    });
  });

  describe('when category fetching succeeds', () => {
    beforeAll(() => {
      mockGetAll.mockResolvedValue(availableCategories);
    });

    beforeEach(async () => {
      rerender = renderComponent();

      await screen.findByText(availableCategories[0].name);
    });

    it('displays the select dropdown with default option', () => {
      expect(screen.getByTitle('Select category')).toBeInTheDocument();
      expect(screen.getByText('Choose...')).toBeInTheDocument();
    });

    it('displays errors', () => {
      expect(
        screen.queryByTestId('category-select-errors')
      ).not.toBeInTheDocument();

      const requiredError = {
        id: { message: 'category is a required field', type: 'min' }
      };

      rerender(
        <CategorySelect
          category={unselectedCategory}
          onChange={mockOnChange}
          errors={requiredError}
        />
      );

      expect(screen.getByText(requiredError.id.message)).toBeInTheDocument();
    });

    it('fills dropdown with fetched categories', () => {
      availableCategories.forEach((category) => {
        expect(screen.getByText(category.name)).toBeInTheDocument();
      });
    });

    it('invokes #onChange on select', () => {
      userEvent.selectOptions(screen.getByTitle('Select category'), ['0']);

      expect(mockOnChange).toHaveBeenCalledWith(availableCategories[0]);
    });
  });
});
