import Faker from 'faker';
import React from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SearchBar from '../SearchBar';

describe(SearchBar, () => {
  beforeEach(() => {
    render(
      <SearchBar renderFiltered={(input) => <ul>{input.toUpperCase()}</ul>} />
    );
  });

  it('displays search box with child', () => {
    expect(
      screen.getByPlaceholderText('Search for a card...')
    ).toBeInTheDocument();
    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('updates child based on input', () => {
    const input = Faker.company.companyName();
    userEvent.type(screen.getByRole('textbox'), input);

    expect(screen.queryByText(input)).not.toBeInTheDocument();
    expect(screen.getByText(input.toUpperCase())).toBeInTheDocument();
  });
});
