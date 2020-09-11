import React from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SideBar from '../SideBar';

const mockSetCategory = jest.fn();

describe(SideBar, () => {
  beforeEach(() => {
    render(<SideBar setCategory={mockSetCategory} />);
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
