import React from 'react';
import { Category } from '../../types';
import NavButton from './NavButton';

interface CategoryButtonProps {
  category: Category;
  onClick: (event: React.MouseEvent<Element, MouseEvent>) => void;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({
  category,
  onClick
}): JSX.Element => {
  return (
    <NavButton
      className='border-bottom border-secondary'
      variant='secondary'
      onClick={onClick}
      iconSrc={category.iconUrl}
      text={category.name}
    />
  );
};

export default CategoryButton;
