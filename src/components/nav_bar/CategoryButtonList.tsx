import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import CategoryService from '../../services/CategoryService';
import { Category } from '../../types';
import CategoryButton from './CategoryButton';
import NavButton from './NavButton';
import { GiBookshelf } from 'react-icons/gi';
import { useCategory } from '../../helpers/hooks';

const CategoryButtonList: React.FC = (): JSX.Element => {
  const { selectedCategory, setSelectedCategory } = useCategory()!;

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

  return (
    <>
      <NavButton
        className='bg-primary text-light'
        key='category-all'
        onClick={() => setSelectedCategory(undefined)}
        active={selectedCategory === undefined}
        icon={<GiBookshelf />}
        text='All Categories'
      />
      {availableCategories.map((category) => (
        <CategoryButton
          key={`category-${category.id}`}
          category={category}
          onClick={() => setSelectedCategory(category)}
          active={selectedCategory === category}
        />
      ))}
    </>
  );
};

export default CategoryButtonList;
