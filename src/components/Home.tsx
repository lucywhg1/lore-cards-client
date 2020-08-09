import React from 'react';
import { Container, Jumbotron } from 'react-bootstrap';

import CardPreviewsList from './search/CardPreviewsList';
import SearchBar from './search/SearchBar';

const Home: React.FC = () => {
  return (
    <>
      <Jumbotron className='bg-light' fluid>
        <Container>
          <h1 className='text-primary'>Welcome to the landing page!</h1>
          <h3 className='text-secondary'>Below, I'm currently working on...</h3>
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
