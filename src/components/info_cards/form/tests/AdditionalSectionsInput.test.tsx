import React, { ReactElement } from 'react';
import {
  render,
  screen,
  fireEvent,
  RenderResult
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Faker from 'faker';
import AdditionalSectionsInput from '../AdditionalSectionsInput';
import { Section } from '../../../../types';
import { SectionFactory } from '../../../../factories';
import { fillOutFieldByElement } from '../../../form/tests/helpers';

const mockOnChange = jest.fn();

describe(AdditionalSectionsInput, () => {
  const placeholder = {
    heading: 'Add a section heading...',
    body: '...and a body.'
  };

  const renderInput = (loadedSections: Section[]): RenderResult => {
    return render(
      <AdditionalSectionsInput
        sections={loadedSections}
        onChange={mockOnChange}
      />
    );
  };

  describe('no sections', () => {
    beforeEach(() => {
      renderInput([]);
    });

    it('does not render inputs with no sections', () => {
      expect(screen.queryAllByPlaceholderText(placeholder.heading)).toEqual([]);
      expect(screen.queryAllByPlaceholderText(placeholder.body)).toEqual([]);
    });

    it('renders an Add Section button', () => {
      expect(screen.getByRole('button', { name: /Add/ })).toBeInTheDocument();
    });

    it('invokes #onChange when section is added', () => {
      userEvent.click(screen.getByRole('button', { name: /Add/ }));
      expect(mockOnChange).toHaveBeenCalledWith([
        {
          heading: '',
          body: ''
        }
      ]);
    });
  });

  describe('with sections created', () => {
    const loadedSection = SectionFactory.build();

    let rerender: (ui: ReactElement) => void;

    beforeEach(() => {
      rerender = renderInput([loadedSection]).rerender;
    });

    it('displays the loaded sections', () => {
      expect(
        screen.getByPlaceholderText(placeholder.heading)
      ).toBeInTheDocument();
      expect(screen.getByPlaceholderText(placeholder.body)).toBeInTheDocument();
    });

    it('displays errors for loaded sections', () => {
      expect(
        screen.queryByTestId(`section-0-heading-errors`)
      ).not.toBeInTheDocument();

      const headingErrors = [
        {
          heading: {
            message: 'a section heading is required',
            type: 'required'
          }
        }
      ];

      rerender(
        <AdditionalSectionsInput
          sections={[loadedSection]}
          onChange={mockOnChange}
          errors={headingErrors}
        />
      );

      expect(
        screen.getByText(headingErrors[0].heading.message)
      ).toBeInTheDocument();
    });

    it('invokes #onChange when a section heading is updated', () => {
      const heading = Faker.company.bsNoun();
      const headingInput = screen.getByPlaceholderText(placeholder.heading);

      fillOutFieldByElement(headingInput, heading);

      expect(mockOnChange).toHaveBeenLastCalledWith([
        { ...loadedSection, heading }
      ]);
    });

    it('invokes #onChange when section body is updated', () => {
      const body = Faker.lorem.paragraph();
      const bodyInput = screen.getByPlaceholderText(placeholder.body);

      fillOutFieldByElement(bodyInput, body);

      expect(mockOnChange).toHaveBeenCalledWith([{ ...loadedSection, body }]);
    });

    it('invokes #onChange when section is removed', () => {
      const removeButton = screen.getByTitle(/Remove/);

      userEvent.click(removeButton);

      expect(mockOnChange).toHaveBeenCalledWith([]);
    });
  });
});
