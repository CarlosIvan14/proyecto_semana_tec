import React from 'react';
import './UserNavbar.css';
import { FaSearch, FaFilter, FaUser } from 'react-icons/fa';

const UserNavbar = ({ loggedIn }) => {
  const isMobile = window.innerWidth <= 768; // Determinar si estamos en un dispositivo móvil

  return (
    <div className="user-navbar">
      <div className="user-navbar-content row">
        {isMobile ? (
          <button className="menu-toggle">
            <div className="menu-icon"></div>
            <div className="menu-icon"></div>
            <div className="menu-icon"></div>
          </button>
        ) : (
          <div className="user-navbar-links col-8 row">
            <a href="/" className='col-2'>Home</a>
            <a href="/Compras" className='col-2'>Compras</a>
            <a href="#carrito" className='col-2'>Carrito</a>
          </div>
        )}
        <div className="user-navbar-search col-4">
          <button className='b'>
            <FaFilter />
          </button>
          <input type="text" placeholder="Buscar" />
          <button className='b'>
            <FaSearch />
          </button>
          {loggedIn ? (
            <button className='b'>
              <FaUser />
            </button>
          ) : (
            <button className='btn'>Iniciar Sesión</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserNavbar;
