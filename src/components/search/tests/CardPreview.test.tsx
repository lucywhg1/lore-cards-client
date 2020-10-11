import CardPreview from '../CardPreview';

import React from 'react';

import { render, screen } from '@testing-library/react';
import { InfoCardPreviewFactory } from '../../../factories/InfoCardFactory';
import userEvent from '@testing-library/user-event';

const mockOnClick = jest.fn();

describe(CardPreview, () => {
  const preview = InfoCardPreviewFactory.build();
  const { title, subtitle, category, tags, avatarUrl, summary, id } = preview;

  beforeEach(() => {
    render(<CardPreview preview={preview} onClick={mockOnClick} />);
  });

  it('displays basic card info', () => {
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(subtitle)).toBeInTheDocument();
    expect(screen.getByText(category.name)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', avatarUrl);
    expect(screen.getByText(summary)).toBeInTheDocument();
  });

  it('loads card tags', () => {
    tags.forEach((tag) => {
      expect(screen.getByText(tag.name)).toBeInTheDocument();
    });
  });

  it('shows card summary on hover', async () => {
    userEvent.hover(screen.getByText(title));

    expect(await screen.findByRole('tooltip')).toHaveTextContent(summary);
  });

  it('invokes onClick with card id', () => {
    userEvent.click(screen.getByTestId('card-preview-item'));

    expect(mockOnClick).toHaveBeenCalled();
  });
});
