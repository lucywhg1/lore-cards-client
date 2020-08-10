import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CategorySelect from '../CategorySelect';
import { Category } from '../../../types';
import { emptyCategory } from '../../../types/Category';
import { CategoryFactory } from '../../../factories';
import { toast as mockToast } from 'react-toastify';

const mockGetAll = jest.fn();
jest.mock('../../../services/CategoryService', () => {
  return jest.fn().mockImplementation(() => {
    return { getAll: mockGetAll };
  });
});

const mockOnChange = jest.fn();

describe(CategorySelect, () => {
  const availableCategories = CategoryFactory.buildList(2);

  const renderComponent = (): void => {
    render(
      <CategorySelect
        category={emptyCategory}
        onChange={mockOnChange}
        placeholder='placeholder'
      />
    );
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
      renderComponent();

      await screen.findByText(availableCategories[0].name);
    });

    it('displays the select dropdown with placeholder option text', () => {
      expect(screen.getByTitle('Select category')).toBeInTheDocument();
      expect(screen.getByText('placeholder')).toBeInTheDocument();
    });

    it('fills dropdown with fetched categories', () => {
      availableCategories.forEach((category) => {
        expect(screen.getByText(category.name)).toBeInTheDocument();
      });
    });

    describe('#onChange behavior', () => {
      it('invokes with chosen option', () => {
        userEvent.selectOptions(screen.getByTitle('Select category'), ['0']);

        expect(mockOnChange).toHaveBeenCalledWith(availableCategories[0]);
      });

      it('invokes with empty category for default option', () => {
        userEvent.selectOptions(screen.getByTitle('Select category'), ['-1']);

        expect(mockOnChange).toHaveBeenCalledWith(emptyCategory);
      });
    });
  });
});
