import React, { useState, useEffect, ChangeEvent } from 'react';
import { Form } from 'react-bootstrap';
import Category from '../../../types/Category';
import { DeepMap } from 'react-hook-form/dist/types/utils';
import { FieldError } from 'react-hook-form';
import { toast } from 'react-toastify';
import CategoryService from '../../../services/CategoryService';

interface CategorySelectProps {
  category?: Category;
  onChange: (selectedValue: Category) => void;
  errors?: DeepMap<Category, FieldError>;
}

const CategorySelect: React.FC<CategorySelectProps> = ({
  category,
  onChange,
  errors
}): JSX.Element => {
  const [availableCategories, setAvailableCategories] = useState<Category[]>(
    []
  );

  useEffect(() => {
    const fetchCategories = async () => {
      const categoryService = new CategoryService();

      categoryService
        .getAll()
        .then((response) => setAvailableCategories(response))
        .catch((e: Error) =>
          toast.error(`Unable to get Categories. ${e.message}`)
        );
    };

    fetchCategories();
  }, []);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    event.persist();
    onChange(availableCategories[Number(event.target.value)]);
  };

  return (
    <>
      <Form.Label>Category</Form.Label>
      <Form.Control
        title='Select category'
        as='select'
        custom
        value={category ? category.id : -1}
        onChange={(event) => {
          handleChange(event as any);
        }}
        isInvalid={!!errors}
        className='border border-primary'
      >
        <option value={-1}>Choose...</option>
        {availableCategories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </Form.Control>
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

export default CategorySelect;
