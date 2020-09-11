import React from 'react';
import { ListGroup } from 'react-bootstrap';
import Brand from '../layout/Brand';

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
  const renderIcon = (): React.ReactNode => (
    <img alt={`${text} Icon`} src={iconSrc} width='32' height='32' />
  );

  return (
    <ListGroup.Item
      className={className}
      action
      variant={variant}
      onClick={onClick}
    >
      <Brand renderIcon={renderIcon} text={text} />
    </ListGroup.Item>
  );
};

export default NavButton;
