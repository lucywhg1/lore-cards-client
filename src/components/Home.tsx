import React from 'react';

import { Container, Button, Jumbotron } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import logo from '../assets/logo.svg';
import NewCardModal from './info_cards/NewCardModal';
import SearchBar from './search/SearchBar';
import CardPreviewsList from './search/CardPreviewsList';

const Home: React.FC = () => {
  return (
    <>
      <Container className='p-2 bg-secondary text-light d-flex' fluid>
        <img
          alt='logo'
          src={logo}
          width='30'
          height='30'
          className='align-self-center ml-1 mr-auto border border-light rounded'
        />
        <LinkContainer to='/'>
          <Button>Home</Button>
        </LinkContainer>
      </Container>
      <Jumbotron fluid>
        <Container className='text-justify mb-3'>
          <h1 className='text-primary'>Welcome to the landing page!</h1>
          <h4 className='text-secondary'>Below, I'm currently working on...</h4>
        </Container>
        <Container className='m-auto'>
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
