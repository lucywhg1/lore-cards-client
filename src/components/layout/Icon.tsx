import React from 'react';
import { Col, Row } from 'react-bootstrap';

interface IconProps {
  src?: string;
  text: string;
}

/**
 * Displays an icon with text that responsively hides on small screens.
 * If no icon is given, uses first letters of given text.
 */
const Icon: React.FC<IconProps> = ({ src, text }): JSX.Element => {
  return (
    <Row className='ml-auto mr-auto'>
      <Col xs={1}>
        {src ? (
          <img alt={`${text} Icon`} src={src} width='32' height='32' />
        ) : (
          <div />
        )}
      </Col>
      <Col xs={{ offset: 1 }} className='d-none d-md-block'>
        <span className='font-weight-lighter'>{text}</span>
      </Col>
    </Row>
  );
};

export default Icon;
