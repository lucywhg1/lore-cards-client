import React from 'react';
import { ListGroup } from 'react-bootstrap';
import Brand from '../layout/Brand';

interface NavButtonProps {
  iconSrc?: string;
  text: string;
  onClick: (event: React.MouseEvent<Element, MouseEvent>) => void;
  className?: string;
  variant?: string;
  active?: boolean;
}

const NavButton: React.FC<NavButtonProps> = ({
  iconSrc,
  text,
  onClick,
  className,
  variant,
  active = false
}): JSX.Element => {
  const mergedClassName = className;
  const imgIcon = (
    <img alt={`${text} Icon`} src={iconSrc} width='32' height='32' />
  );

  return (
    <ListGroup.Item
      className={
        active ? mergedClassName + ' bg-primary text-light' : mergedClassName
      }
      action
      variant={variant}
      onClick={onClick}
    >
      <Brand icon={iconSrc ? imgIcon : undefined} text={text} />
    </ListGroup.Item>
  );
};

export default NavButton;
