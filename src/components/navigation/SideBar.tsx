import React from 'react';
import { ListGroup } from 'react-bootstrap';
import CategoryButtonList from './CategoryButtonList';

const SideBar: React.FC = (): JSX.Element => {
  return (
    <ListGroup
      variant='flush'
      className='flex-column border-mid-width border-primary'
      defaultActiveKey='all'
    >
      <CategoryButtonList />
    </ListGroup>
  );
};

export default SideBar;
