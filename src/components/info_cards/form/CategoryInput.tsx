import React from 'react';
import { Form } from 'react-bootstrap';
import Category from '../../../types/Category';
import { DeepMap } from 'react-hook-form/dist/types/utils';
import { FieldError } from 'react-hook-form';

import CategorySelect from '../../categories/CategorySelect';

interface CategoryInputProps {
  category: Category;
  onChange: (selectedValue: Category) => void;
  errors?: DeepMap<Category, FieldError>;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  category,
  onChange,
  errors
}): JSX.Element => {
  return (
    <>
      <Form.Label>Category</Form.Label>
      <CategorySelect
        category={category}
        onChange={onChange}
        isInvalid={!!errors}
        className='border border-primary'
      />
      {errors?.id && (
        <Form.Control.Feedback
          type='invalid'
          data-testid='category-select-errors'
        >
          {errors.id.message}
        </Form.Control.Feedback>
      )}
    </>
  );
};

export default CategoryInput;
