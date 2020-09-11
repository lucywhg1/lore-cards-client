import React from 'react';

import { render, screen } from '@testing-library/react';

import { CategoryFactory } from '../../../factories';
import CategoryButtonList from '../CategoryButtonList';

const mockGetAll = jest.fn();
jest.mock('../../../services/CategoryService', () => {
  return jest.fn().mockImplementation(() => {
    return { getAll: mockGetAll };
  });
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

  it('renders buttons for all categories', () => {
    expect(screen.getByText(/All/)).toBeInTheDocument();
    expect(screen.getAllByRole('button').length).toEqual(
      availableCategories.length + 1
    );
  });
});
