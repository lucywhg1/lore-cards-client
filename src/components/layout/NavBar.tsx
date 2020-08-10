import React from 'react';
import { Form, Navbar } from 'react-bootstrap';
import Logo from './Logo';

const NavBar: React.FC = (): JSX.Element => {
  return (
    <Navbar variant='dark' bg='primary'>
      <Navbar.Brand href='/' className='rounded bg-secondary ' role='button'>
        <Logo />
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
