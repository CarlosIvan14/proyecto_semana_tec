import React, {useState} from 'react';
import { FaSearch, FaFilter, FaUser } from 'react-icons/fa';
import './RegistrationForm.css';

const RegistrationForm = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setContrasena] = useState('');

  const handleNombreChange = (event) => {
    setNombre(event.target.value);
  };

  const handleCorreoChange = (event) => {
    setCorreo(event.target.value);
  };

  const handleContrasenaChange = (event) => {
    setContrasena(event.target.value);
  };

  const handleRegistroClick = () => {
    // Crear un objeto con los datos del usuario
    const nuevoUsuario = {
      nombre,
      correo,
      password,
    };
  
    // Enviar el objeto al servidor utilizando fetch o cualquier otra biblioteca para hacer solicitudes HTTP
    fetch('http://localhost:4000/api/registrar-usuario', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevoUsuario),
    })
      .then((response) => response.json())
      .then((data) => {
        // Manejar la respuesta del servidor, por ejemplo, mostrar un mensaje de éxito
        console.log('Usuario registrado con éxito:', data);
      })
      .catch((error) => {
        // Manejar errores, por ejemplo, mostrar un mensaje de error
        console.error('Error al registrar el usuario:', error);
      });
  };

  return (
    <div className="registration-form">
      <h2>Registrarse</h2>
      <div className="user-icon">
        <FaUser />
      </div>
      <div className="form-group">
          <h3>Nombre</h3>
          <input
            type="text"
            value={nombre}
            onChange={handleNombreChange}
            style={{ background: '#D9D9D9' }}
          />
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
          <h3>Constraseña</h3>
          <input
            type="text"
            value={password}
            onChange={handleContrasenaChange}
            style={{ background: '#D9D9D9' }}
          />
      </div>
      <button className="registration-button" onClick={handleRegistroClick}>Registrarse</button>
    </div>
  );
};

export default RegistrationForm;
