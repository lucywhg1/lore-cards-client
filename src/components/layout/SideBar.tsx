import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Icon from './Icon';
import { useHistory } from 'react-router-dom';

const SideBar: React.FC = (): JSX.Element => {
  const history = useHistory();

  const handleSelect = (eventKey: string | null) => {
    history.push(eventKey || '/');
  };

  return (
    <Nav
      variant='pills'
      defaultActiveKey='/'
      className='flex-column border-primary'
      onSelect={(eventKey) => handleSelect(eventKey)}
    >
      <Nav.Item>
        <Nav.Link eventKey='/'>
          <Icon text='Rumors' />
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey='link-1'>Option 2</Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default SideBar;
