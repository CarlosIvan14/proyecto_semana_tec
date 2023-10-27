import React, { useState, useEffect } from 'react';
import UserNavbar from './UserNavbar';
import './Perfil.css';
import { useAuth } from '../AuthContext.js';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';

const Perfil = () => {
  const { loggedIn, logout } = useAuth();
  const [nombre, setNombre] = useState("No hay nombre disponible");
  const [correo, setCorreo] = useState("No hay correo disponible");

  useEffect(() => {
    // Cargar los datos del usuario desde el localStorage al montar el componente
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setNombre(userData.nombre);
      setCorreo(userData.correo);
    }
  }, []);

  return (
    <div>
      <UserNavbar loggedIn={loggedIn} />
      <div className='container'>
        <div className="user-icon">
          <FaUser />
        </div>
        <div className="form-group">
          <h1>Nombre</h1>
          <h5>{nombre}</h5>
          <h1>Correo Electrónico</h1>
          <h5>{correo}</h5>
        </div>
        <Link to='/'>
          <button onClick={logout} className='btn btn-danger'>
            Cerrar Sesión
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Perfil;
