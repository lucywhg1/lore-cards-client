import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import CategoryService from '../../services/CategoryService';
import { Category } from '../../types';
import CategoryButton from './CategoryButton';
import NavButton from './NavButton';

const CategoryButtonList: React.FC = (): JSX.Element => {
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

  const handleCategorySelect = (id: number) => {
    console.log(id);
    // alert(`/categories/${key}`);
  };

  return (
    <>
      <NavButton
        key={-1}
        onClick={() => handleCategorySelect(-1)}
        iconSrc='https://image.flaticon.com/icons/png/512/130/130304.png'
        text='All Categories'
      />
      {availableCategories.map((category) => (
        <CategoryButton
          key={category.id}
          category={category}
          onClick={() => handleCategorySelect(category.id)}
        />
      ))}
    </>
  );
};

export default CategoryButtonList;
