import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import NewCardModal from '../info_cards/NewCardModal';

import CategoryButtonList from './CategoryButtonList';

const SideBar: React.FC = (): JSX.Element => {
  return (
    <ListGroup variant='flush' className='bg-dark'>
      <NewCardModal />
      <CategoryButtonList />
    </ListGroup>
  );
};

export default SideBar;
