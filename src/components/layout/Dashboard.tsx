import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useState } from 'react';
import Home from '../Home';
import SideBar from '../navigation/SideBar';
import { Category } from '../../types';

const Dashboard: React.FC = (): JSX.Element => {
  const [category, setCategory] = useState<Category>();

  return (
    <Row>
      <Col xs={2}>
        <SideBar category={category} setCategory={setCategory} />
      </Col>
      <Col>
        <Home />
      </Col>
    </Row>
  );
};

export default Dashboard;
