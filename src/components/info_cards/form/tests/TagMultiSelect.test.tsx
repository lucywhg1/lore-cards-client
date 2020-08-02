import TagMultiSelect from '../TagMultiSelect';
import { render, screen } from '@testing-library/react';
import selectEvent from 'react-select-event';
import React from 'react';
import mockApiService from '../../../../services/ApiService';
import { TagFactory } from '../../../../factories';
import userEvent from '@testing-library/user-event';
import Faker from 'faker';

jest.mock('../../../../services/ApiService');

const mockOnChange = jest.fn();

describe(TagMultiSelect, () => {
  const loadedTags = TagFactory.buildList(2);
  const capitalizedText = Faker.name.firstName();
  let multiSelect: HTMLElement;

  const renderComponent = async (): Promise<void> => {
    render(<TagMultiSelect onChange={mockOnChange} selected={loadedTags} />);

    multiSelect = screen.getByRole('textbox');
    await screen.findByText(loadedTags[0].name); // wait for fetch
  };

  beforeAll(() => {
    mockApiService.prototype.getTags = jest.fn().mockResolvedValue(loadedTags);
  });

  beforeEach(async () => {
    await renderComponent();
  });

  it('displays a multi select with loaded options', () => {
    expect(multiSelect).toBeInTheDocument();
    loadedTags.forEach((tag) => {
      expect(screen.getByText(tag.name)).toBeInTheDocument();
    });
  });

  it('displays create label when user is typing', () => {
    userEvent.type(multiSelect, capitalizedText);
    expect(
      screen.getByText(`create "${capitalizedText.toLowerCase()}"`)
    ).toBeInTheDocument();
  });

  describe('#onChange behavior', () => {
    fit('invokes when tag is selected', async () => {
      screen.debug();
      screen.debug();
      // userEvent.click(multiSelect);

      loadedTags.forEach((tag) => {
        userEvent.click(screen.getByText(tag.name));
      });

      // expect(mockOnChange).toHaveBeenCalledTimes(2);
      expect(mockOnChange).toHaveBeenLastCalledWith(loadedTags);
    });

    it('invokes when tag is removed', () => {});

    it('invokes when tag is created with lowercased input', async () => {
      await selectEvent.create(multiSelect, capitalizedText, {
        createOptionText: `create "${capitalizedText.toLowerCase()}"`
      });

      expect(mockOnChange).toHaveBeenCalledTimes(2);
      expect(mockOnChange).toHaveBeenLastCalledWith({
        name: capitalizedText.toLowerCase()
      });
    });
  });
});
