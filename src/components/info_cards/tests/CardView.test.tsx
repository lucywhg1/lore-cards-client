import React from 'react';
import { render, screen } from '@testing-library/react';
import { InfoCardFactory } from '../../../factories/InfoCardFactory';
import CardView from '../CardView';

describe(CardView, () => {
  const card = InfoCardFactory.build();
  const {
    title,
    subtitle,
    summary,
    description,
    additionalSections,
    tags,
    category,
    avatarUrl
  } = card;

  beforeEach(() => {
    render(<CardView card={card} />);
  });

  it('renders card text details', () => {
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(subtitle)).toBeInTheDocument();
    expect(screen.getByText(summary, { exact: false })).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(description.substr(0, 10)))
    ).toBeInTheDocument();
    expect(
      screen.getByText((additionalSections || [])[0].heading)
    ).toBeInTheDocument();
  });

  it('renders related card objects', () => {
    expect(screen.getByText(category.name)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', avatarUrl);
    tags.forEach((tag) => {
      expect(screen.getByText(tag.name)).toBeInTheDocument();
    });
  });
});
