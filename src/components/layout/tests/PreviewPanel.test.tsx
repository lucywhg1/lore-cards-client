import React from 'react';
import { render, screen } from '@testing-library/react';
import PreviewPanel from '../PreviewPanel';
import { InfoCardPreviewFactory } from '../../../factories';

const mockGetAll = jest
  .fn()
  .mockResolvedValue(InfoCardPreviewFactory.buildList(2));
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
  beforeEach(async () => {
    render(<PreviewPanel />);

    await screen.findAllByTestId('card-preview-item');
  });

  it('displays a card search bar and preview list', () => {
    expect(screen.getByPlaceholderText(/Search/)).toBeInTheDocument();
    expect(screen.getAllByTestId('card-preview-item').length).toEqual(2);
  });

  it('fetches card previews with category', () => {
    expect(mockGetAll).toHaveBeenCalledWith({ categoryId });
  });
});
