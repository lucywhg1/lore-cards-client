import React from 'react';
import logo from '../../logo.png';
import { Col, Row } from 'react-bootstrap';

const Logo: React.FC = (): JSX.Element => {
  return (
    <Row className='ml-auto mr-auto'>
      <Col xs={1}>
        <img alt='Lore Cards logo' src={logo} width='32' height='32'></img>
      </Col>
      <Col xs={{ offset: 1 }} className='d-none d-md-block'>
        <span className='font-weight-lighter'>Lore Cards</span>
      </Col>
    </Row>
  );
};

export default Logo;
