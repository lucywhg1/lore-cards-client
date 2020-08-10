import React from 'react';
import { Container, Jumbotron } from 'react-bootstrap';

import CardPreviewsList from './search/CardPreviewsList';
import SearchBar from './search/SearchBar';
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
        <SearchBar
          renderFiltered={(input) => <CardPreviewsList input={input} />}
        />
      </Container>
    </>
  );
};

export default Home;
