import React from 'react';
import { Category } from '../../types';

import CategoryButtonList from './CategoryButtonList';

interface SideBarProps {
  setCategory: (category?: Category) => void;
  category?: Category;
}

const SideBar: React.FC<SideBarProps> = ({ setCategory }): JSX.Element => {
  const handleCategorySelect = (category?: Category) => {
    setCategory(category);
  };

  return (
    <div>
      <CategoryButtonList onSelect={handleCategorySelect} />
    </div>
  );
};

export default SideBar;
