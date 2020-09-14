import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';

interface BrandProps {
  icon?: React.ReactNode;
  text: string;
}

// Displays text with an icon as child or, if none provided, an auto-generated initials icon.
const Brand: React.FC<BrandProps> = ({ icon, text }): JSX.Element => {
  const [initials, setInitials] = useState('?');

  useEffect(() => {
    if (!icon) {
      setInitials(text.substr(0, 2));
    }
  }, [icon, text]);

  return (
    <Container className='pl-0'>
      <span className='mr-2'>
        {icon ? (
          icon
        ) : (
          <span className='font-weight-bold rounded-pill border-mid-width p-1 align-middle'>
            {initials}
          </span>
        )}
      </span>
      <span className='d-none d-md-inline align-middle'>{text}</span>
    </Container>
  );
};

export default Brand;
