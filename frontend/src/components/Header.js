import React from 'react';
import logo from '../logo.svg';

const Header = () => (
  <header style={{ display: 'flex', alignItems: 'center', padding: '10px', backgroundColor: '#ffffff' }}>
    <img src={logo} alt="Logo" style={{ height: '40px', marginRight: '10px' }} />
    <h1>Stock Management</h1>
  </header>
);

export default Header;
