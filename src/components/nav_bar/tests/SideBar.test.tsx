import React from 'react';

import { render, screen } from '@testing-library/react';

import SideBar from '../SideBar';

jest.mock('../../../services/CategoryService', () => {
  return jest.fn().mockImplementation(() => {
    return { getAll: jest.fn().mockResolvedValue([]) };
  });
});
React.useContext = jest.fn().mockReturnValue({
  selectedCategory: undefined,
  setSelectedCategory: jest.fn()
});

describe(SideBar, () => {
  beforeEach(async () => {
    render(<SideBar />);

    await screen.findAllByRole('button');
  });

  it('has a #NewCardModal button', () => {
    expect(screen.getByRole('button', { name: /New Card/ }));
  });

  it('contains #CategoryButtonList', () => {
    expect(screen.getByText(/All/)).toBeInTheDocument();
  });
});
