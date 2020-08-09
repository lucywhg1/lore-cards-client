import CardPreview from '../CardPreview';

import React from 'react';

import { render, screen } from '@testing-library/react';
import { InfoCardPreviewFactory } from '../../../factories/InfoCardFactory';
import userEvent from '@testing-library/user-event';

const mockOnClick = jest.fn();

describe(CardPreview, () => {
  const preview = InfoCardPreviewFactory.build();
  const { id, title, subtitle, summary, category, avatarUrl } = preview;

  beforeEach(() => {
    render(<CardPreview preview={preview} onClick={mockOnClick} />);
  });

  it('displays card info', () => {
    expect(screen.getByText(title)).toBeInTheDocument();
    subtitle && expect(screen.getByText(subtitle)).toBeInTheDocument();
    expect(screen.getByText(summary)).toBeInTheDocument();
    expect(screen.getByText(category.name)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', avatarUrl);
  });

  it('invokes onClick with card id', () => {
    userEvent.click(screen.getByTestId('card-preview-item'));

    expect(mockOnClick).toHaveBeenCalledWith(id);
  });
});
