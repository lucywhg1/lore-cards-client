import Faker from 'faker';
import React from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CardSearchBar from '../CardSearchBar';

jest.mock('../CardPreviewsList');

describe(CardSearchBar, () => {
  const categoryId = 1;

  beforeEach(() => {
    render(
      <CardSearchBar categoryId={categoryId} />
    );
  });

  it('displays search box with preview list', () => {
    expect(
      screen.getByPlaceholderText('Search for a card...')
    ).toBeInTheDocument();
    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it("passes categoryId to previews list", () => {
    expect(screen.getByText(String(categoryId))).toBeInTheDocument();
  });

  it('updates child based on input', () => {
    const input = Faker.company.companyName();
    userEvent.type(screen.getByRole('textbox'), input);

    expect(screen.queryByText(input)).not.toBeInTheDocument();
    expect(screen.getByText(input.toUpperCase())).toBeInTheDocument();
  });
});
