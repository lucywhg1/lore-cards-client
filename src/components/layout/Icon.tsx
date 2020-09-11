import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';

interface IconProps {
  src?: string;
  text: string;
}

const Icon: React.FC<IconProps> = ({ src, text }): JSX.Element => {
  const [initials, setInitials] = useState('?');

  useEffect(() => {
    if (!src) {
      setInitials(text.substr(0, 2));
    }
  }, [src, text]);

  return (
    <Container>
      <span className='mr-2'>
        {src ? (
          <img alt={`${text} Icon`} src={src} width='32' height='32' />
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

export default Icon;
