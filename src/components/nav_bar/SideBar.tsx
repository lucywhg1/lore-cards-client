import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
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
    <ListGroup variant='flush' className=''>
      <CategoryButtonList onSelect={handleCategorySelect} />
    </ListGroup>
  );
};

export default SideBar;
