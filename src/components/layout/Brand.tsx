import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';

interface BrandProps {
  renderIcon?: () => React.ReactNode;
  text: string;
}

// Displays text with an icon as child or, if none provided, an auto-generated initials icon.
const Brand: React.FC<BrandProps> = ({ renderIcon, text }): JSX.Element => {
  const [initials, setInitials] = useState('?');

  useEffect(() => {
    if (!renderIcon) {
      setInitials(text.substr(0, 2));
    }
  }, [renderIcon, text]);

  return (
    <Container>
      <span className='mr-2'>
        {renderIcon ? (
          renderIcon()
        ) : (
          <span className='font-weight-bold rounded-pill border-mid-width p-1'>
            {initials}
          </span>
        )}
      </span>
      <span className='d-none d-md-inline align-middle'>{text}</span>
    </Container>
  );
};

export default Brand;
