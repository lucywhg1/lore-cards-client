import React from 'react';
import { ListGroup } from 'react-bootstrap';
import Brand from '../layout/Brand';

interface NavButtonProps {
  icon?: React.ReactNode;
  text: string;
  onClick: (event: React.MouseEvent<Element, MouseEvent>) => void;
  className?: string;
  variant?: string;
  active?: boolean;
}

const NavButton: React.FC<NavButtonProps> = ({
  icon,
  text,
  onClick,
  className,
  variant,
  active = false
}): JSX.Element => {
  return (
    <ListGroup.Item
      className={
        active
          ? className + ' bg-primary-darker text-light border-left-thick-light'
          : className
      }
      action
      variant={variant}
      onClick={onClick}
    >
      <Brand icon={icon} text={text} />
    </ListGroup.Item>
  );
};

export default NavButton;
