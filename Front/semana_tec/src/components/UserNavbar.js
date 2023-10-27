import React from 'react';
import './UserNavbar.css';
import { FaSearch, FaFilter, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

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
            <a href="/Carrito" className='col-2'>Carrito</a>
          </div>
        )}
        <div className="user-navbar-search col-4">
          <input type="text" placeholder="Buscar" />
          <button className='b'>
            <FaSearch />
          </button>
          {loggedIn ? (
            <Link to="/Perfil">
              <button className='b'>
                <FaUser />
              </button>
            </Link>
          ) : (
            <Link to="/FormSession">
              <button className='btn'>Iniciar Sesion</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserNavbar;
