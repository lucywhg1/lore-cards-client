import React from 'react';
import CardPreviewsList from '../CardPreviewsList';
import { InfoCardPreviewFactory } from '../../../factories/InfoCardFactory';
import { render, screen } from '@testing-library/react';
import { InfoCardPreview, Tag } from '../../../types';
import userEvent from '@testing-library/user-event';

const categoryId = 1;
const mockSetSelectionContext = jest.fn();
React.useContext = jest.fn().mockReturnValue({
  selectionContext: {
    category: { id: categoryId },
    cardId: undefined
  },
  setSelectionContext: mockSetSelectionContext
});

const mockGetAll = jest.fn();
jest.mock('../../../services/InfoCardService', () => {
  return jest.fn().mockImplementation(() => {
    return { getAll: mockGetAll };
  });
});

describe(CardPreviewsList, () => {
  const uniqueTitle = 'shar123';
  const cardList: InfoCardPreview[] = [
    InfoCardPreviewFactory.build(),
    InfoCardPreviewFactory.build({ title: uniqueTitle, tags: [] }),
    InfoCardPreviewFactory.build({ title: uniqueTitle.toUpperCase(), tags: [] })
  ];

  const renderComponent = async (
    input: string = '',
    tagsFilter: Tag[] = []
  ): Promise<void> => {
    render(<CardPreviewsList bodyFilter={input} tagsFilter={tagsFilter} />);

    await screen.findAllByTestId('card-preview-item');
  };

  beforeAll(() => {
    mockGetAll.mockResolvedValue(cardList);
  });

  it('calls #InfoCardService with category id', () => {
    renderComponent();

    expect(mockGetAll).toHaveBeenCalledWith({ categoryId });
  });

  it('loads all available cards with no input or tag filter', async () => {
    await renderComponent();

    cardList.forEach((card) => {
      expect(screen.getByText(card.title)).toBeInTheDocument();
    });
  });

  it('filters cards with lowercased input', async () => {
    const [excludedCard, ...matchingCards] = cardList;
    await renderComponent(uniqueTitle);

    expect(screen.queryByText(excludedCard.title)).not.toBeInTheDocument();
    matchingCards.forEach((card) => {
      expect(screen.getByText(card.title)).toBeInTheDocument();
    });
  });

  it('filters cards with tag selection', async () => {
    const [includedCard, ...matchingCards] = cardList;
    await renderComponent('', [includedCard.tags[0]]);

    expect(screen.getByText(includedCard.title)).toBeInTheDocument();
    matchingCards.forEach((card) => {
      expect(screen.queryByText(card.title)).not.toBeInTheDocument();
    });
  });

  it('updates card context on preview selection', async () => {
    await renderComponent();
    userEvent.click(screen.getByText(cardList[0].title));

    expect(mockSetSelectionContext).toHaveBeenCalledWith(
      expect.objectContaining({ cardId: cardList[0].id })
    );
  });
});
