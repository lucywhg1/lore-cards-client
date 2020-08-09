import React from 'react';
import CardPreviewsList from '../CardPreviewsList';
import { InfoCardPreviewFactory } from '../../../factories/InfoCardFactory';
import { render, screen } from '@testing-library/react';
import { InfoCardPreview } from '../../../types';
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
    InfoCardPreviewFactory.build({ title: uniqueTitle }),
    InfoCardPreviewFactory.build({ title: uniqueTitle.toUpperCase() })
  ];

  const renderComponent = async (input: string = ''): Promise<void> => {
    render(<CardPreviewsList input={input} />);

    await screen.findAllByTestId('card-preview-item');
  };

  beforeAll(() => {
    mockGetAll.mockResolvedValue(cardList);
  });

  it('loads all available cards with no input', async () => {
    await renderComponent();

    cardList.forEach((card) => {
      expect(screen.getByText(card.title)).toBeInTheDocument();
    });
  });

  it('loads filtered cards with lowercased input', async () => {
    const [filteredCard, ...matchingCards] = cardList;
    await renderComponent(uniqueTitle);

    expect(screen.queryByText(filteredCard.title)).not.toBeInTheDocument();
    matchingCards.forEach((card) => {
      expect(screen.getByText(card.title)).toBeInTheDocument();
    });
  });

  it('pushes to card page when selected', async () => {
    await renderComponent();
    userEvent.click(screen.getByText(cardList[0].title));

    expect(mockHistoryPush).toHaveBeenCalledWith(`/cards/${cardList[0].id}`);
  });
});
