import Faker from 'faker';
import React from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
Tag;

import CardSearchBar from '../CardSearchBar';
import { TagFactory } from '../../../factories';

jest.mock('../CardPreviewsList');

const mockGetAll = jest.fn();
jest.mock('../../../services/TagService', () => {
  return jest.fn().mockImplementation(() => {
    return { getAll: mockGetAll };
  });
});

describe(CardSearchBar, () => {
  const categoryId = 1;
  const loadedTags = TagFactory.buildList(2);

  beforeAll(() => {
    mockGetAll.mockResolvedValue(loadedTags);
  });

  beforeEach(() => {
    render(
      <CardSearchBar categoryId={categoryId} />
    );
  });

  it('displays with preview list', () => {
    expect(
      screen.getByPlaceholderText('Search for a card...')
    ).toBeInTheDocument();
    expect(screen.getByTestId("tag-multi-select")).toBeInTheDocument();
    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it("passes categoryId to previews list", () => {
    expect(screen.getByText(String(categoryId))).toBeInTheDocument();
  });

  it('updates input in previews list', () => {
    const input = Faker.company.companyName();
    userEvent.type(screen.getByRole('textbox'), input);

    expect(screen.queryByText(input)).not.toBeInTheDocument();
    expect(screen.getByText(input.toUpperCase())).toBeInTheDocument();
  });

  it('updates tag selection in previews list', async () => {
    expect(screen.queryByText(loadedTags[0].name)).not.toBeInTheDocument();

    await selectEvent.select(screen.getByTestId("tag-multi-select"), loadedTags[0].name);

    expect(screen.getByText(loadedTags[0].name)).toBeInTheDocument();
  });
});
