import React from 'react';

import InfoCardForm from '../InfoCardForm';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Faker from 'faker';
import { SUMMARY_MAX_LENGTH } from '../validations';
import {
  InfoCardInputFactory,
  CategoryFactory,
  TagFactory
} from '../../../../factories';
import { fillOutCardForm } from '../../../../helpers/tests';

const mockGetAllCategories = jest.fn();
jest.mock('../../../../services/CategoryService', () => {
  return jest.fn().mockImplementation(() => {
    return { getAll: mockGetAllCategories };
  });
});

const mockGetAllTags = jest.fn();
jest.mock('../../../../services/TagService', () => {
  return jest.fn().mockImplementation(() => {
    return { getAll: mockGetAllTags };
  });
});

const mockOnSubmit = jest.fn();
const mockOnCancel = jest.fn();

describe(InfoCardForm, () => {
  const mockCategories = CategoryFactory.buildList(2);
  const mockTags = TagFactory.buildList(2);
  const emptyInputs = InfoCardInputFactory.build();
  const filledInputs = InfoCardInputFactory.build(
    {},
    { transient: { filled: true } }
  );
  filledInputs.category = mockCategories[0];

  const renderComponent = async (
    defaultValues = emptyInputs
  ): Promise<void> => {
    render(
      <InfoCardForm
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
        defaultValues={defaultValues}
      />
    );

    await screen.findAllByRole('option'); // all categories fetched
  };

  beforeAll(() => {
    mockGetAllCategories.mockResolvedValue(mockCategories);
    mockGetAllTags.mockResolvedValue(mockTags);
  });

  describe('with empty values population', () => {
    beforeEach(() => {
      renderComponent();
    });

    it('displays form inputs', () => {
      expect(
        screen.getByRole('textbox', { name: 'Title' })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('textbox', { name: 'Subtitle' })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('combobox', { name: 'Category' })
      ).toBeInTheDocument();
      expect(screen.getByText('Add...')).toBeInTheDocument();
      expect(
        screen.getByRole('textbox', { name: 'Avatar Url' })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('textbox', { name: 'Summary' })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('textbox', { name: 'Description' })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'Add section' })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'Create' })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'Cancel' })
      ).toBeInTheDocument();
    });

    it('invokes #onCancel when button is clicked', () => {
      userEvent.click(screen.getByRole('button', { name: 'Cancel' }));

      expect(mockOnCancel).toHaveBeenCalled();
    });

    describe('Create button', () => {
      let createButton: HTMLElement;
      const requiredFields = {
        title: filledInputs.title,
        category: filledInputs.category
      };

      beforeEach(() => {
        createButton = screen.getByRole('button', { name: 'Create' });
      });

      it('invokes #onSubmit when required fields are filled', async () => {
        fillOutCardForm(requiredFields);
        userEvent.click(createButton);

        await waitFor(() =>
          expect(mockOnSubmit).toHaveBeenCalledWith(
            expect.objectContaining(requiredFields)
          )
        );
      });

      it('does not invoke #onSubmit if required fields are not filled out', () => {
        fillOutCardForm({ summary: Faker.lorem.words(2) });
        userEvent.click(createButton);

        expect(mockOnSubmit).not.toHaveBeenCalled();
      });

      describe('when summary field is empty', () => {
        beforeEach(() => {
          fillOutCardForm(requiredFields);
        });

        it('generates from description if provided', async () => {
          const summary = `${filledInputs.description.substring(
            0,
            SUMMARY_MAX_LENGTH
          )}...`;
          fillOutCardForm({ description: filledInputs.description });
          userEvent.click(createButton);

          await waitFor(() =>
            expect(mockOnSubmit).toHaveBeenCalledWith(
              expect.objectContaining({ summary })
            )
          );
        });

        it('generates empty summary if no description provided', async () => {
          userEvent.click(createButton);

          await waitFor(() =>
            expect(mockOnSubmit).toHaveBeenCalledWith(
              expect.objectContaining({ summary: 'No description.' })
            )
          );
        });
      });
    });
  });

  describe('default value population', () => {
    beforeEach(() => {
      renderComponent(filledInputs);
    });

    it('renders with default values', () => {
      expect(screen.getByDisplayValue(filledInputs.title)).toBeInTheDocument();
      expect(
        screen.getByDisplayValue(filledInputs.subtitle)
      ).toBeInTheDocument();
      expect(screen.getByText(filledInputs.category.name)).toBeInTheDocument();
      expect(
        screen.getByDisplayValue(filledInputs.summary)
      ).toBeInTheDocument();
      expect(screen.getByText(filledInputs.tags[0].name)).toBeInTheDocument();
      expect(
        screen.getByDisplayValue(
          new RegExp(filledInputs.description.substr(0, 10))
        )
      ).toBeInTheDocument();
      expect(
        screen.getByDisplayValue(filledInputs.additionalSections[0].heading)
      ).toBeInTheDocument();
    });
  });
});
