import React from 'react';

import { render, screen } from '@testing-library/react';

import { CategoryFactory } from '../../../factories';
import CategoryButtonList from '../CategoryButtonList';
import userEvent from '@testing-library/user-event';

const mockGetAll = jest.fn();
jest.mock('../../../services/CategoryService', () => {
  return jest.fn().mockImplementation(() => {
    return { getAll: mockGetAll };
  });
});

const mockSetSelectedCategory = jest.fn();
React.useContext = jest.fn().mockReturnValue({
  selectedCategory: undefined,
  setSelectedCategory: mockSetSelectedCategory
});

describe(CategoryButtonList, () => {
  const availableCategories = CategoryFactory.buildList(2);

  beforeAll(() => {
    mockGetAll.mockResolvedValue(availableCategories);
  });

  beforeEach(async () => {
    render(<CategoryButtonList />);

    await screen.findByText(availableCategories[0].name);
  });

  describe('All Categories behavior', () => {
    it('shows button', () => {
      expect(screen.getByText(/All/)).toBeInTheDocument();
    });

    it('invokes context #setSelectedCategory with empty params', () => {
      userEvent.click(screen.getByText(/All/));

      expect(mockSetSelectedCategory).toHaveBeenCalledWith(undefined);
    });
  });

  describe('fetched categories behavior', () => {
    it('shows all buttons', () => {
      availableCategories.forEach((category) => {
        expect(screen.getByText(category.name)).toBeInTheDocument();
      });
    });

    it('invokes context #setSelectedCategory for each button', () => {
      availableCategories.forEach((category) => {
        userEvent.click(screen.getByText(category.name));

        expect(mockSetSelectedCategory).toHaveBeenCalledWith(category);
      });
    });
  });
});
