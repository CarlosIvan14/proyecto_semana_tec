import React, { useState, useEffect } from 'react';
import CustomNavbar from './components/UserNavbar';
import ListaCompras from './components/ListaCompras';
import './Home.css';
import defaultImage from './sitios.png';
import UserNavbar from './components/UserNavbar';
import { useAuth } from './AuthContext.js'; // Importa el contexto de autenticación

function Compras() {
  const { loggedIn } = useAuth(); // Accede al estado de sesión desde el contexto de autenticación
  const [productos, setProductos] = useState([]); // Inicializado como un array vacío
  const [nombre, setNombre] = useState("No hay nombre disponible");

  useEffect(() => {
    // Cargar los datos del usuario desde el localStorage al montar el componente
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setNombre(userData.nombre);
    }
  }, []);
  
    // Realiza una solicitud GET al servidor


    fetch('http://localhost:4000/api/compras/'+nombre)
      .then((response) => response.json())
      .then((data) => {
        // Actualiza el estado con los datos recibidos
        setProductos(data);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

  return (
    <div className="fondo">
      <UserNavbar loggedIn={loggedIn}/>
      <br></br>
      <div className='row container-fluid'>
        <div className='col-6'>
          <h2>Lista de compras</h2>
          <ListaCompras productos={productos} />
        </div>
        <div className='col-6'>
          <h2>Sitios favoritos</h2>
          <img src={defaultImage} className='sitios-imagen' />
        </div>
      </div>
      <br></br>
      {loggedIn ? (
        <p>Usuario autenticado. Muestra contenido específico para usuarios autenticados.</p>
      ) : (
        <p>Usuario no autenticado. Muestra contenido para usuarios no autenticados.</p>
      )}
    </div>
  );
}

export default Compras;
