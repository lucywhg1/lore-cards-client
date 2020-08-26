import Faker from 'faker';
import React from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CardSearchBar from '../CardSearchBar';
import { TagFactory } from '../../../factories';
import selectEvent from 'react-select-event';

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

  beforeEach(async () => {
    render(
      <CardSearchBar categoryId={categoryId} />
    );

    selectEvent.openMenu(screen.getByText("Select..."));
    await screen.findByText(loadedTags[0].name);
  });

  it('displays with preview list', () => {
    expect(
      screen.getByPlaceholderText('Search for a card...')
    ).toBeInTheDocument();

    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it("passes categoryId to previews list", () => {
    expect(screen.getByText(String(categoryId))).toBeInTheDocument();
  });

  it('updates input in previews list', () => {
    const input = Faker.company.companyName();
    userEvent.type(screen.getByPlaceholderText('Search for a card...'), input);

    expect(screen.queryByText(input)).not.toBeInTheDocument();
    expect(screen.getByText(input.toUpperCase())).toBeInTheDocument();
  });

  it('updates tag selection in previews list', async () => {
    const mockTagText = `Tag name is ${ loadedTags[0].name }`;

    expect(screen.queryByText(mockTagText)).not.toBeInTheDocument();

    await selectEvent.select(screen.getByText("Select..."), loadedTags[0].name);

    expect(screen.getByText(mockTagText)).toBeInTheDocument();
  });
});
