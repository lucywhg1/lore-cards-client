import Faker from 'faker';
import React from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CardSearchBar from '../CardSearchBar';
import { TagFactory } from '../../../factories';
import selectEvent from 'react-select-event';

const mockSetFilter = jest.fn();

jest.mock('../CardPreviewsList');

const mockGetAll = jest.fn();
jest.mock('../../../services/TagService', () => {
  return jest.fn().mockImplementation(() => {
    return { getAll: mockGetAll };
  });
});

/**
 * It updates body and tags, calls setFilter with each using updated
 */

describe(CardSearchBar, () => {
  const body = Faker.lorem.word();
  const [includedTag, excludedTag] = TagFactory.buildList(2);

  let searchInput: HTMLElement;
  let selectMenu: HTMLElement;

  beforeAll(() => {
    mockGetAll.mockResolvedValue([includedTag, excludedTag]);
  });

  beforeEach(async () => {
    render(
      <CardSearchBar
        filter={{ body, tags: [includedTag] }}
        setFilter={mockSetFilter}
      />
    );

    searchInput = screen.getByPlaceholderText(/Search/);
    selectMenu = await screen.findByText(includedTag.name);
  });

  it('displays input with passed in body', () => {
    expect(searchInput).toHaveAttribute('value', body);
  });

  it('displays tag filter with passed in tags', () => {
    expect(screen.getByText(includedTag.name)).toBeInTheDocument();
    expect(screen.queryByText(excludedTag.name)).not.toBeInTheDocument();
  });

  it('invokes #setFilter with updated input', () => {
    userEvent.type(searchInput, 'a');

    expect(mockSetFilter).toHaveBeenCalledWith({
      body: body + 'a',
      tags: [includedTag]
    });
  });

  it('invokes #setFilter with updated tags', async () => {
    await selectEvent.select(selectMenu, excludedTag.name);

    expect(mockSetFilter).toHaveBeenCalledWith({
      body,
      tags: [includedTag, excludedTag]
    });
  });
});
