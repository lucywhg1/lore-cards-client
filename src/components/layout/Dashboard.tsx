import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React from 'react';
import Home from '../Home';
import SideBar from './SideBar';

const Dashboard: React.FC = (): JSX.Element => {
  return (
    <Row>
      <Col sm={2}>
        <SideBar />
      </Col>
      <Col>
        <Home />
      </Col>
    </Row>
  );
};

export default Dashboard;
