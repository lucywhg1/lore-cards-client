import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useState } from 'react';
import SideBar from '../nav_bar/SideBar';
import { Category } from '../../types';
import PreviewPanel from './PreviewPanel';
import Container from 'react-bootstrap/esm/Container';
import CardView from '../info_cards/CardView';
import CardPanel from './CardPanel';

interface CategoryContextType {
  selectedCategory?: Category;
  setSelectedCategory: (value?: Category) => void;
}

export const CategoryContext = React.createContext<
  CategoryContextType | undefined
>(undefined);

const Dashboard: React.FC = (): JSX.Element => {
  const [category, setCategory] = useState<Category>();
  const [shownCardId, setShownCardId] = useState<number>(0);

  return (
    <CategoryContext.Provider
      value={{ selectedCategory: category, setSelectedCategory: setCategory }}
    >
      <Container fluid className='p-0'>
        <Row className='height-full'>
          <Col className='pr-0 rounded bg-primary' xs={2}>
            <SideBar />
          </Col>
          <Col className='bg-light p-2' xs={3}>
            <PreviewPanel onCardSelect={setShownCardId} />
          </Col>
          <Col className='p-2'>
            <CardPanel id={shownCardId} />
          </Col>
        </Row>
      </Container>
    </CategoryContext.Provider>
  );
};

export default Dashboard;
