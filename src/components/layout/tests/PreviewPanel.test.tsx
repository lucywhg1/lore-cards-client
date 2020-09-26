import React from 'react';
import { render, screen } from '@testing-library/react';
import PreviewPanel from '../PreviewPanel';
import { InfoCardPreviewFactory } from '../../../factories';
import userEvent from '@testing-library/user-event';

const mockGetAll = jest.fn();
jest.mock('../../../services/InfoCardService', () => {
  return jest.fn().mockImplementation(() => {
    return { getAll: mockGetAll };
  });
});

const categoryId = 1;
React.useContext = jest.fn().mockReturnValue({
  selectedCategory: { id: categoryId },
  setSelectedCategory: jest.fn()
});

describe(PreviewPanel, () => {
  const mockOnSelect = jest.fn();
  const infoCardPreviews = InfoCardPreviewFactory.buildList(2);

  beforeAll(() => {
    mockGetAll.mockResolvedValue(infoCardPreviews);
  });

  beforeEach(async () => {
    render(<PreviewPanel onCardSelect={mockOnSelect} />);

    await screen.findAllByTestId('card-preview-item');
  });

  it('displays a card search bar and preview list', () => {
    expect(screen.getByPlaceholderText(/Search/)).toBeInTheDocument();
    expect(screen.getAllByTestId('card-preview-item').length).toEqual(2);
  });

  it('fetches card previews with category', () => {
    expect(mockGetAll).toHaveBeenCalledWith({ categoryId });
  });

  it('invokes #onSelect when card is clicked', () => {
    userEvent.click(screen.getByText(infoCardPreviews[0].title));

    expect(mockOnSelect).toHaveBeenCalledWith(infoCardPreviews[0].id);
  });
});
