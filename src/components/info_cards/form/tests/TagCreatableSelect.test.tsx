import Faker from 'faker';
import React from 'react';
import selectEvent from 'react-select-event';

import { waitFor } from '@testing-library/dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { TagFactory } from '../../../../factories';
import TagCreatableSelect from '../TagCreatableSelect';
import { toast as mockToast } from 'react-toastify';

const mockGetAll = jest.fn();
jest.mock('../../../../services/TagService', () => {
  return jest.fn().mockImplementation(() => {
    return { getAll: mockGetAll };
  });
});

const mockOnChange = jest.fn();

describe(TagCreatableSelect, () => {
  const loadedTags = TagFactory.buildList(2);
  const capitalizedInput = Faker.name.firstName();

  let creatableSelect: HTMLElement;

  const renderComponent = (): void => {
    render(<TagCreatableSelect onChange={mockOnChange} selected={[]} />);

    creatableSelect = screen.getByRole('textbox');
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

      selectEvent.openMenu(creatableSelect);
      await screen.findByText(loadedTags[0].name);
    });

    it('displays a multi select with loaded options', () => {
      expect(creatableSelect).toBeInTheDocument();
      loadedTags.forEach((tag) => {
        expect(screen.getByText(tag.name)).toBeInTheDocument();
      });
    });

    it('displays create label when user is typing', () => {
      userEvent.type(creatableSelect, capitalizedInput);
      expect(
        screen.getByText(`create "${ capitalizedInput.toLowerCase() }"`)
      ).toBeInTheDocument();
    });

    describe('#onChange behavior', () => {
      it('invokes when tag is selected', async () => {
        await selectEvent.select(creatableSelect, loadedTags[0].name);

        expect(mockOnChange).toHaveBeenCalledWith([loadedTags[0]]);
      });

      it('invokes with lowercased input on tag creation', async () => {
        selectEvent.create(creatableSelect, capitalizedInput, {
          createOptionText: /create/
        });

        const expectedTag = {
          name: capitalizedInput.toLowerCase()
        };

        await waitFor(() =>
          expect(mockOnChange).toHaveBeenLastCalledWith([expectedTag])
        );
      });
    });
  });
});
