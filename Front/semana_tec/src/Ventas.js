import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext.js'; // Importa el contexto de autenticación
import SocioNavbar from './components/SocioNavbar';
import './Ventas.css'
import ventas from './ventas.png'
function Ventas() {
  return (
    <div className="fondo">
      <SocioNavbar/>
      <br />
      <div className="container" style={{ marginTop: '20px' }}>
        <div className="row mx-auto">
          <img src={ventas}></img>
        </div>
      </div>
    </div>
  );
}

export default Ventas;