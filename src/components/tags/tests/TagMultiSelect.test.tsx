import React from 'react';
import selectEvent from 'react-select-event';

import { waitFor } from '@testing-library/dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TagMultiSelect from '../TagMultiSelect';
import { toast as mockToast } from 'react-toastify';
import { TagFactory } from '../../../factories';

const mockGetAll = jest.fn();
jest.mock('../../../services/TagService', () => {
  return jest.fn().mockImplementation(() => {
    return { getAll: mockGetAll };
  });
});

const mockOnChange = jest.fn();

describe(TagMultiSelect, () => {
  const loadedTags = TagFactory.buildList(2);

  let multiSelect: HTMLElement;

  const renderComponent = (): void => {
    render(<TagMultiSelect onChange={mockOnChange} selected={[]} />);

    multiSelect = screen.getByRole('textbox');
  };

  describe('when tag fetching fails', () => {
    it('displays error toast', async () => {
      mockGetAll.mockRejectedValue('Fetch failed.');

      renderComponent();

      await waitFor(() => expect(mockToast.error).toHaveBeenCalled());
    });
  });

  describe('when tag fetching succeeds', () => {
    beforeAll(() => {
      mockGetAll.mockResolvedValue(loadedTags);
    });

    beforeEach(async () => {
      renderComponent();

      selectEvent.openMenu(multiSelect);
      await screen.findByText(loadedTags[0].name);
    });

    it('displays a multi select with loaded options', () => {
      expect(multiSelect).toBeInTheDocument();
      loadedTags.forEach((tag) => {
        expect(screen.getByText(tag.name)).toBeInTheDocument();
      });
    });

    it('ignores case when filtering options based on user input', () => {
      userEvent.type(multiSelect, loadedTags[0].name.toUpperCase());

      expect(screen.getByText(loadedTags[0].name)).toBeInTheDocument();
    });

    describe('#onChange behavior', () => {
      it('invokes when tag is selected', async () => {
        await selectEvent.select(multiSelect, loadedTags[0].name);

        expect(mockOnChange).toHaveBeenCalledWith([loadedTags[0]]);
      });
    });
  });
});
