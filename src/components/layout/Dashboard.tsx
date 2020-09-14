import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useState } from 'react';
import SideBar from '../nav_bar/SideBar';
import { Category } from '../../types';
import PreviewPanel from './PreviewPanel';

interface CategoryContextType {
  selectedCategory?: Category;
  setSelectedCategory: (value?: Category) => void;
}

export const CategoryContext = React.createContext<
  CategoryContextType | undefined
>(undefined);

const Dashboard: React.FC = (): JSX.Element => {
  const [category, setCategory] = useState<Category>();

  return (
    <CategoryContext.Provider
      value={{ selectedCategory: category, setSelectedCategory: setCategory }}
    >
      <Row>
        <Col className='pr-0 rounded' xs={2}>
          <SideBar />
        </Col>
        <Col className='bg-light p-2' md={4}>
          <PreviewPanel />
        </Col>
      </Row>
    </CategoryContext.Provider>
  );
};

export default Dashboard;
