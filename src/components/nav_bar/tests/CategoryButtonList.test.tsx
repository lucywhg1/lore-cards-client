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

const mockOnSelect = jest.fn();

describe(CategoryButtonList, () => {
  const availableCategories = CategoryFactory.buildList(2);

  beforeAll(() => {
    mockGetAll.mockResolvedValue(availableCategories);
  });

  beforeEach(async () => {
    render(<CategoryButtonList onSelect={mockOnSelect} />);

    await screen.findByText(availableCategories[0].name);
  });

  describe('All Categories behavior', () => {
    it('shows button', () => {
      expect(screen.getByText(/All/)).toBeInTheDocument();
    });

    it('invokes #onSelect with empty params', () => {
      userEvent.click(screen.getByText(/All/));

      expect(mockOnSelect).toHaveBeenCalledWith(undefined);
    });
  });

  describe('fetched categories behavior', () => {
    it('shows all buttons', () => {
      availableCategories.forEach((category) => {
        expect(screen.getByText(category.name)).toBeInTheDocument();
      });
    });

    it('invokes #onSelect with each category', () => {
      availableCategories.forEach((category) => {
        userEvent.click(screen.getByText(category.name));

        expect(mockOnSelect).toHaveBeenCalledWith(category);
      });
    });
  });
});
