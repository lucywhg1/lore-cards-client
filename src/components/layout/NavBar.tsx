import React from 'react';
import { Form, Navbar } from 'react-bootstrap';

import logo from '../../assets/logo.png';

const NavBar: React.FC = (): JSX.Element => {
  return (
    <Navbar variant='dark' bg='primary'>
      <Navbar.Brand href='/' className='rounded bg-secondary pl-2 pr-3'>
        <img
          alt='Lore Cards logo'
          src={logo}
          width='32'
          height='32'
          className='mr-2'
        />
        <span className='font-weight-lighter'>Lore Cards</span>
      </Navbar.Brand>
      <div className='ml-auto'>
        <Form inline>
          <Form.Control type='text' placeholder='Search for a card...' />
        </Form>
      </div>
    </Navbar>
  );
};

export default NavBar;
