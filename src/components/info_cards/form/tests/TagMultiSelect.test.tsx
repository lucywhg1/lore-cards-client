import Faker from 'faker';
import React from 'react';
import selectEvent from 'react-select-event';

import { waitFor } from '@testing-library/dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { TagFactory } from '../../../../factories';
import mockApiService from '../../../../services/ApiService';
import TagMultiSelect from '../TagMultiSelect';

jest.mock('../../../../services/ApiService');

const mockOnChange = jest.fn();

describe(TagMultiSelect, () => {
  const loadedTags = TagFactory.buildList(2);
  const capitalizedInput = Faker.name.firstName();

  let multiSelect: HTMLElement;

  const renderComponent = (): void => {
    render(<TagMultiSelect onChange={mockOnChange} selected={[]} />);

    multiSelect = screen.getByRole('textbox');
  };

  beforeAll(() => {
    mockApiService.prototype.getTags = jest.fn().mockResolvedValue(loadedTags);
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

  it('displays create label when user is typing', () => {
    userEvent.type(multiSelect, capitalizedInput);
    expect(
      screen.getByText(`create "${capitalizedInput.toLowerCase()}"`)
    ).toBeInTheDocument();
  });

  describe('#onChange behavior', () => {
    it('invokes when tag is selected', async () => {
      await selectEvent.select(multiSelect, loadedTags[0].name);

      expect(mockOnChange).toHaveBeenCalledWith([loadedTags[0]]);
    });

    it('invokes with lowercased input on tag creation', async () => {
      selectEvent.create(multiSelect, capitalizedInput, {
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
