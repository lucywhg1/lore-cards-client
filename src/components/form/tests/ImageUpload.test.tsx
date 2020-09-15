import React from 'react';
import ImageUpload from '../ImageUpload';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { startCase } from 'lodash';
import ImageFactory from '../../../factories/FileFactory';
import Faker from 'faker';

const mockOnChange = jest.fn();

describe(ImageUpload, () => {
  it('displays a file input, a placeholder image, and no subtext', () => {
    render(<ImageUpload name='imageUpload' onChange={mockOnChange} url='' />);
    const preview = screen.getByRole('img');

    expect(screen.getByLabelText(startCase('imageUpload'))).toBeInTheDocument();
    expect(preview).toBeInTheDocument();
    expect(screen.queryByTestId('imageUploadSubtext')).not.toBeInTheDocument();
  });

  it('displays subtext if supplied', () => {
    const fakeSubtext = Faker.lorem.sentence();
    render(
      <ImageUpload
        name='imageUpload'
        onChange={mockOnChange}
        url=''
        subtext={fakeSubtext}
      />
    );

    expect(screen.getByText(fakeSubtext)).toBeInTheDocument();
  });

  describe('upload behavior', () => {
    const imageUrl = Faker.image.imageUrl();
    let upload: HTMLElement;

    beforeEach(() => {
      render(
        <ImageUpload
          name='imageUpload'
          onChange={mockOnChange}
          url={imageUrl}
        />
      );
      upload = screen.getByLabelText(startCase('imageUpload'));

      userEvent.type(upload, imageUrl);
    });

    it('calls onChange with typed url', () => {
      expect(mockOnChange).toHaveBeenCalledWith(imageUrl);
    });

    it('sets preview image to passed in url', () => {
      expect(screen.getByRole('img')).toHaveAttribute('src', imageUrl);
    });
  });
});
