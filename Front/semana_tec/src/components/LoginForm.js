import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext.js';
import './LoginForm.css';

const LoginForm = () => {
  const { login } = useAuth();
  const { setUser_ggs } = useAuth();
  const [correo, setCorreo] = useState('');
  const [password, setContrasena] = useState('');
  const navigate = useNavigate();

  const handleCorreoChange = (event) => {
    setCorreo(event.target.value);
  };

  const handleContrasenaChange = (event) => {
    setContrasena(event.target.value);
  };

  const handleLoginClick = () => {
    const nuevoUsuario = {
      correo,
      password,
    };

    fetch('http://localhost:4000/api/verify_user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevoUsuario),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('estado login:', data[0].tipo);
        if (data) {
          login(data[0]); // Marca al usuario como autenticado
        } else {
          // Maneja el caso en que el inicio de sesión falla (usuario no válido)
          console.error('Error al intentar el login');
        }
        if(data[0].tipo == 'socio'){
          navigate('/Pedidos');
        }else{
          navigate('/');
        }
      })
      .catch((error) => {
        console.error('Error al intentar el login:', error);
      });
  };

  return (
    <div className="login-form">
      <h2>Iniciar Sesión</h2>
      <div className="user-icon">
        <FaUser />
      </div>
      <div className="form-group">
        <h3>Correo Electrónico</h3>
        <input
          type="text"
          value={correo}
          onChange={handleCorreoChange}
          style={{ background: '#D9D9D9' }}
        />
      </div>
      <div className="form-group">
        <h3>Contraseña</h3>
        <input
          type="password"
          value={password}
          onChange={handleContrasenaChange}
          style={{ background: '#D9D9D9' }}
        />
      </div>
      <button className="login-button" onClick={handleLoginClick}>
        Iniciar Sesión
      </button>
    </div>
  );
};

export default LoginForm;
