import React from 'react';
import { render, screen } from '@testing-library/react';
import CardPanel from '../CardPanel';
import { InfoCardFactory } from '../../../factories/InfoCardFactory';
import { waitFor } from '@testing-library/dom';

const mockGet = jest.fn();
jest.mock('../../../services/InfoCardService', () => {
  return jest.fn().mockImplementation(() => {
    return { get: mockGet };
  });
});

describe(CardPanel, () => {
  it('shows message when loading', () => {
    mockGet.mockRejectedValue({});
    render(<CardPanel id={-1} />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  describe('with card loaded', () => {
    const infoCard = InfoCardFactory.build();

    beforeAll(() => {
      mockGet.mockResolvedValue(infoCard);
    });

    beforeEach(async () => {
      render(<CardPanel id={infoCard.id} />);

      await screen.findByText(infoCard.title);
    });

    it('fetches an info card with id', async () => {
      await waitFor(() => expect(mockGet).toHaveBeenCalledWith(infoCard.id));
    });

    it('renders a card view with loaded card', () => {
      expect(screen.getByText(infoCard.title)).toBeInTheDocument();
    });
  });
});
