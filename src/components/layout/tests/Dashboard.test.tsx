import Dashboard from '../Dashboard';
import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  InfoCardFactory,
  InfoCardPreviewFactory
} from '../../../factories/InfoCardFactory';

const mockGet = jest.fn();
const mockGetAll = jest.fn();
jest.mock('../../../services/InfoCardService', () => {
  return jest.fn().mockImplementation(() => {
    return {
      get: mockGet,
      getAll: mockGetAll
    };
  });
});

describe(Dashboard, () => {
  const infoCard = InfoCardFactory.build();

  beforeAll(() => {
    mockGet.mockResolvedValue(infoCard);
    mockGetAll.mockResolvedValue(InfoCardPreviewFactory.buildList(2));
  });

  beforeEach(() => {
    render(<Dashboard />);
  });

  it('has a sidebar', async () => {
    expect(
      await screen.findByRole('button', { name: /All/ })
    ).toBeInTheDocument();
  });

  it('has a preview panel', async () => {
    expect(
      (await screen.findAllByTestId('card-preview-item'))[0]
    ).toBeInTheDocument();
  });

  it('has a card view', async () => {
    expect(
      await screen.findByText(new RegExp(infoCard.description.substr(0, 10)))
    );
  });
});
