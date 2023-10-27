import React from 'react';
import './SocioNavbar.css';
import { FaSearch, FaFilter, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SocioNavbar = ({ loggedIn }) => {
  const isMobile = window.innerWidth <= 768; // Determinar si estamos en un dispositivo móvil

  return (
    <div className="socio-navbar">
      <div className="user-navbar-content row">
        {isMobile ? (
          <button className="menu-toggle">
            <div className="menu-icon"></div>
            <div className="menu-icon"></div>
            <div className="menu-icon"></div>
          </button>
        ) : (
          <div className="user-navbar-links col-8 row">
            <a href="/Pedidos" className='col-2'>Pedidos</a>
            <a href="/Ventas" className='col-2'>Ventas</a>
          </div>
        )}
        <div className="user-navbar-search col-4">
            <Link to="/Perfil2">
              <button className='b'>
                <FaUser />
              </button>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default SocioNavbar;