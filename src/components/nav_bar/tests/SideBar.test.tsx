import React from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SideBar from '../SideBar';

const mockSetCategory = jest.fn();

jest.mock('../../../services/CategoryService', () => {
  return jest.fn().mockImplementation(() => {
    return { getAll: jest.fn().mockResolvedValue([]) };
  });
});

describe(SideBar, () => {
  beforeEach(async () => {
    render(<SideBar setCategory={mockSetCategory} />);

    await screen.findAllByRole('button');
  });

  it('has a #NewCardModal button', () => {
    expect(screen.getByRole('button', { name: /New Card/ }));
  });

  describe('#CategoryButtonList behavior', () => {
    it('contains the list', () => {
      expect(screen.getByText(/All/)).toBeInTheDocument();
    });

    it('invokes #setCategory on click', () => {
      userEvent.click(screen.getByText(/All/));

      expect(mockSetCategory).toHaveBeenCalled();
    });
  });
});
