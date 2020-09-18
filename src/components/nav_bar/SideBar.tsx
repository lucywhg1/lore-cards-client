import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import NewCardModal from '../info_cards/NewCardModal';

import CategoryButtonList from './CategoryButtonList';

const SideBar: React.FC = (): JSX.Element => {
  return (
    <ListGroup>
      <NewCardModal />
      <CategoryButtonList />
    </ListGroup>
  );
};

export default SideBar;
