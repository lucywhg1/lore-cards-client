import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import CategoryService from '../../services/CategoryService';
import { Category } from '../../types';
import CategoryButton from './CategoryButton';
import NavButton from './NavButton';
import { GiBookshelf } from 'react-icons/gi';

const ALL_CATEGORIES_KEY = 'category-all';

interface CategoryButtonList {
  onSelect: (category?: Category) => void;
}

const CategoryButtonList: React.FC<CategoryButtonList> = ({
  onSelect
}): JSX.Element => {
  const [availableCategories, setAvailableCategories] = useState<Category[]>(
    []
  );
  const [activeKey, setActiveKey] = useState(ALL_CATEGORIES_KEY);

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

  const getButtonKey = (category?: Category): string =>
    category ? `category-${category.id}` : 'category-all';

  const handleCategorySelect = (category?: Category) => {
    setActiveKey(getButtonKey(category));
    onSelect(category);
  };

  return (
    <>
      <NavButton
        className='bg-primary text-light'
        key={ALL_CATEGORIES_KEY}
        onClick={() => handleCategorySelect()}
        active={activeKey === getButtonKey()}
        icon={<GiBookshelf />}
        text='All Categories'
      />
      {availableCategories.map((category) => (
        <CategoryButton
          key={getButtonKey(category)}
          category={category}
          onClick={() => handleCategorySelect(category)}
          active={activeKey === getButtonKey(category)}
        />
      ))}
    </>
  );
};

export default CategoryButtonList;
