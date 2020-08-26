import React from 'react';
import { Container, Jumbotron } from 'react-bootstrap';

import CardSearchBar from './search/CardSearchBar';
import NewCardModal from './info_cards/NewCardModal';

const Home: React.FC = () => {
  return (
    <>
      <Jumbotron className='bg-light' fluid>
        <Container>
          <h1 className='text-primary'>Welcome to the landing page!</h1>
          <h3 className='text-secondary'>Below, I'm currently working on...</h3>
          <NewCardModal />
        </Container>
      </Jumbotron>
      <Container>
        <CardSearchBar
          categoryId={1} />
      </Container>
    </>
  );
};

export default Home;
