import React from 'react';
import { Category } from '../../types';
import NavButton from './NavButton';

interface CategoryButtonProps {
  category: Category;
  onClick: (event: React.MouseEvent<Element, MouseEvent>) => void;
  active?: boolean;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({
  category,
  onClick,
  active = false
}): JSX.Element => {
  return (
    <NavButton
      active={active}
      className='bg-primary text-light'
      onClick={onClick}
      text={category.name}
    />
  );
};

export default CategoryButton;
