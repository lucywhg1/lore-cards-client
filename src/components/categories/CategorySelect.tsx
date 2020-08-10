import React, { ChangeEvent, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { toast } from 'react-toastify';

import CategoryService from '../../services/CategoryService';
import { Category } from '../../types';
import { emptyCategory } from '../../types/Category';

interface CategorySelectProps {
  category: Category;
  onChange: (selectedValue: Category) => void;
  className?: string;
  isInvalid?: boolean;
}

const CategorySelect: React.FC<CategorySelectProps> = ({
  category,
  onChange,
  ...controlProps
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

    const categoryId = Number(event.target.value);
    onChange(
      categoryId === -1 ? emptyCategory : availableCategories[categoryId]
    );
  };

  return (
    <>
      <Form.Control
        title='Select category'
        as='select'
        custom
        value={category ? category.id : -1}
        onChange={(event) => {
          handleChange(event as any);
        }}
        {...controlProps}
      >
        <option value={-1}>Choose...</option>
        {availableCategories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </Form.Control>
    </>
  );
};

export default CategorySelect;
