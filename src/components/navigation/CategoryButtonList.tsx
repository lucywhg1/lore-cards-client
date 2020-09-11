import React, { useEffect, useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { toast } from 'react-toastify';

import CategoryService from '../../services/CategoryService';
import { Category } from '../../types';
import CategoryButton from './CategoryButton';
import NavButton from './NavButton';

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
    <ListGroup
      variant='flush'
      className='flex-column border-mid-width border-primary'
    >
      <NavButton
        key={ALL_CATEGORIES_KEY}
        onClick={() => handleCategorySelect()}
        text='All Categories'
        active={activeKey === getButtonKey()}
      />
      {availableCategories.map((category) => (
        <CategoryButton
          key={getButtonKey(category)}
          category={category}
          onClick={() => handleCategorySelect(category)}
          active={activeKey === getButtonKey(category)}
        />
      ))}
    </ListGroup>
  );
};

export default CategoryButtonList;
