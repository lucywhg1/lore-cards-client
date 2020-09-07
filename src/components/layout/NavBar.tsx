import React from 'react';
import { Navbar } from 'react-bootstrap';
import Icon from './Icon';
import logo from '../../assets/logo.png';

const NavBar: React.FC = (): JSX.Element => {
  return (
    <Navbar sticky='top' variant='dark' bg='primary'>
      <Navbar.Brand href='/' className='rounded bg-secondary' role='button'>
        <Icon src={logo} text='Lore Cards' />
      </Navbar.Brand>
    </Navbar>
  );
};

export default NavBar;
