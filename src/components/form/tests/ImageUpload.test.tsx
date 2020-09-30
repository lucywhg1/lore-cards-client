import React from 'react';
import ImageUpload from '../ImageUpload';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { startCase } from 'lodash';
import Faker from 'faker';

const mockOnChange = jest.fn();

describe(ImageUpload, () => {
  const name = Faker.commerce.color();
  const value = Faker.image.imageUrl();
  const subtext = Faker.lorem.sentence();

  beforeEach(() => {
    render(
      <ImageUpload
        name={name}
        value={value}
        subtext={subtext}
        onChange={mockOnChange}
      />
    );
  });

  it('displays a label with the name', () => {
    expect(screen.getByText(startCase(name))).toBeInTheDocument();
  });

  it('displays subtext', () => {
    expect(screen.getByText(subtext)).toBeInTheDocument();
  });

  it('displays current input', () => {
    expect(screen.getByDisplayValue(value)).toBeInTheDocument();
  });

  it('displays image with given src', () => {
    expect(screen.getByRole('img')).toHaveAttribute('src', value);
  });

  it('invokes #onChange when user inputs URL', () => {
    userEvent.type(screen.getByRole('textbox'), 'a');

    expect(mockOnChange).toHaveBeenLastCalledWith(value + 'a');
  });
});
