import React from 'react';
import { ListGroup } from 'react-bootstrap';
import Icon from '../layout/Icon';

interface NavButtonProps {
  iconSrc?: string;
  text: string;
  onClick: (event: React.MouseEvent<Element, MouseEvent>) => void;
  className?: string;
  variant?: string;
}

const NavButton: React.FC<NavButtonProps> = ({
  iconSrc,
  text,
  onClick,
  className,
  variant
}): JSX.Element => {
  return (
    <ListGroup.Item
      className={className}
      action
      variant={variant}
      onClick={onClick}
    >
      <Icon src={iconSrc} text={text} />
    </ListGroup.Item>
  );
};

export default NavButton;
