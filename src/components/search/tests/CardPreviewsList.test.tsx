import React from 'react';
import CardPreviewsList from '../CardPreviewsList';
import { InfoCardPreviewFactory } from '../../../factories/InfoCardFactory';
import { render, screen } from '@testing-library/react';
import { InfoCardPreview, Tag } from '../../../types';
import userEvent from '@testing-library/user-event';

const mockGetAll = jest.fn();
jest.mock('../../../services/InfoCardService', () => {
  return jest.fn().mockImplementation(() => {
    return { getAll: mockGetAll };
  });
});

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  useHistory: (): {} => ({
    push: mockHistoryPush
  })
}));

describe(CardPreviewsList, () => {
  const uniqueTitle = 'shar123';
  const cardList: InfoCardPreview[] = [
    InfoCardPreviewFactory.build(),
    InfoCardPreviewFactory.build({ title: uniqueTitle, tags: [] }),
    InfoCardPreviewFactory.build({ title: uniqueTitle.toUpperCase(), tags: [] })
  ];

  const renderComponent = async (input: string = '', categoryId?: number, tagsFilter: Tag[] = []): Promise<void> => {
    render(<CardPreviewsList input={input} tagsFilter={tagsFilter} categoryId={categoryId} />);

    await screen.findAllByTestId('card-preview-item');
  };

  beforeAll(() => {
    mockGetAll.mockResolvedValue(cardList);
  });

  describe("fetching cards", () => {
    it('calls #InfoCardService with no category id', () => {
      renderComponent('', 1);

      expect(mockGetAll).toHaveBeenCalledWith(1);
    });

    it('calls #InfoCardService with category id', () => {
      renderComponent('');

      expect(mockGetAll).toHaveBeenLastCalledWith(undefined);
    });
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
    await renderComponent('', 1, [includedCard.tags[0]]);

    expect(screen.getByText(includedCard.title)).toBeInTheDocument();
    matchingCards.forEach((card) => {
      expect(screen.queryByText(card.title)).not.toBeInTheDocument();
    });
  });

  it('pushes to card page when selected', async () => {
    await renderComponent();
    userEvent.click(screen.getByText(cardList[0].title));

    expect(mockHistoryPush).toHaveBeenCalledWith(`/cards/${ cardList[0].id }`);
  });
});
