import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useState } from 'react';
import SideBar from '../nav_bar/SideBar';
import { Category, InfoCard } from '../../types';
import PreviewPanel from './PreviewPanel';
import Container from 'react-bootstrap/esm/Container';
import CardView from '../info_cards/CardView';
import { Jumbotron } from 'react-bootstrap';
import { toast } from 'react-toastify';
import InfoCardService from '../../services/InfoCardService';

interface CategoryContextType {
  selectedCategory?: Category;
  setSelectedCategory: (value?: Category) => void;
}

export const CategoryContext = React.createContext<
  CategoryContextType | undefined
>(undefined);

const Dashboard: React.FC = (): JSX.Element => {
  const [category, setCategory] = useState<Category>();
  const [shownCard, setShownCard] = useState<InfoCard>();

  const handleCardSelect = (id: number): void => {
    const infoCardService = new InfoCardService();

    infoCardService
      .get(id)
      .then((response) => {
        setShownCard(response);
      })
      .catch((e: Error) =>
        toast.error(`Failed to get Card #${id}. ${e.message}`)
      );
  };

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
            <PreviewPanel onCardSelect={handleCardSelect} />
          </Col>
          <Col className='p-2'>
            {shownCard ? (
              <CardView card={shownCard} />
            ) : (
              <Jumbotron>
                <h3>Pick a card from the left, any card will do!</h3>
              </Jumbotron>
            )}
          </Col>
        </Row>
      </Container>
    </CategoryContext.Provider>
  );
};

export default Dashboard;
