import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useState } from 'react';
import SideBar from '../nav_bar/SideBar';
import { Category } from '../../types';
import PreviewPanel from './PreviewPanel';

const Dashboard: React.FC = (): JSX.Element => {
  const [category, setCategory] = useState<Category>();

  return (
    <Row>
      <Col className='pr-0 rounded' xs={2}>
        <SideBar category={category} setCategory={setCategory} />
      </Col>
      <Col className='bg-light p-2' md={4}>
        <PreviewPanel categoryId={category?.id} />
      </Col>
    </Row>
  );
};

export default Dashboard;
