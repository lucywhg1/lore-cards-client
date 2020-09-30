import React from 'react';
import NewCardModal from '../NewCardModal';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

jest.mock('../form/InfoCardForm');

describe(NewCardModal, () => {
  beforeEach(() => {
    render(<NewCardModal />);
  });

  it('displays the button with modal closed', () => {
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: /Create/ })
    ).not.toBeInTheDocument();
  });

  describe('with the modal open', () => {
    beforeEach(async () => {
      userEvent.click(screen.getByRole('button'));

      await waitFor(() =>
        expect(screen.getByTestId('info-card-form')).toBeInTheDocument()
      );
    });

    it('closes when Cancel button is clicked', async () => {
      userEvent.click(screen.getByRole('button', { name: 'Cancel' }));

      await waitFor(() =>
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      );
    });

    it('closes when form submitted with Create', async () => {
      userEvent.click(screen.getByRole('button', { name: 'Create' }));

      await waitFor(() =>
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      );
    });
  });
});
