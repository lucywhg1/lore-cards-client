import React from 'react';
import { render, screen } from '@testing-library/react';
import PreviewPanel from '../../dashboard/PreviewPanel';
import { InfoCardPreviewFactory } from '../../../factories';

React.useContext = jest.fn().mockReturnValue({
  selectionContext: {
    category: undefined,
    cardId: undefined
  },
  setSelectionContext: jest.fn()
});

const mockGetAll = jest.fn();
jest.mock('../../../services/InfoCardService', () => {
  return jest.fn().mockImplementation(() => {
    return { getAll: mockGetAll };
  });
});

describe(PreviewPanel, () => {
  const infoCardPreviews = InfoCardPreviewFactory.buildList(2);

  beforeAll(() => {
    mockGetAll.mockResolvedValue(infoCardPreviews);
  });

  beforeEach(async () => {
    render(<PreviewPanel />);

    await screen.findAllByTestId('card-preview-item');
  });

  it('displays a card search bar and preview list', () => {
    expect(screen.getByPlaceholderText(/Search/)).toBeInTheDocument();
    expect(screen.getAllByTestId('card-preview-item').length).toEqual(2);
  });
});
