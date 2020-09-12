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

describe(PreviewPanel, () => {
  const categoryId = 1;

  beforeEach(async () => {
    render(<PreviewPanel categoryId={categoryId} />);

    await screen.findAllByTestId('card-preview-item');
  });

  it('displays a card search bar and preview list', () => {
    expect(
      screen.getByPlaceholderText('Search for a card...')
    ).toBeInTheDocument();
    expect(screen.getAllByTestId('card-preview-item').length).toEqual(2);
  });

  it('fetches card previews with category', () => {
    expect(mockGetAll).toHaveBeenCalledWith({ categoryId });
  });
});
