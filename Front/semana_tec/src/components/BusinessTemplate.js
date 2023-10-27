import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import defaultImage from './default.png';
import ListaCompras from './ListaCompras';
import UserNavbar from './UserNavbar';
import './BusinessTemplate.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext.js'; // Importa el contexto de autenticación
const BusinessTemplate = () => {
  const [nombre, setNombre] = useState("No hay nombre disponible");

  useEffect(() => {
    // Cargar los datos del usuario desde el localStorage al montar el componente
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setNombre(userData.nombre);
    }
  }, []);
  const { loggedIn } = useAuth(); // Accede al estado de sesión desde el contexto de autenticación
  const { name } = useParams();
  const navigate = useNavigate();
  const [info_negocio, setInfo] = useState([]);
  const [negocio_productos, setProductos] = useState([]);
  console.log(name);
  const agregarProducto = (productoAñadir) => {
    const productoAñadirObj = {
      producto: productoAñadir,
      negocio: name,
      usuario: nombre,
    };

    fetch('http://localhost:4000/api/realizar-pedido', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productoAñadirObj),
    })
      .then((response) => {
        if (response.ok) {
          // El producto se añadió con éxito, redirige al usuario a /Carrito
          navigate('/Carrito'); // Utiliza navigate para redirigir
        } else {
          console.error('Error al agregar el producto');
        }
      })
      .catch((error) => {
        console.error('Error al agregar el producto:', error);
      });
  };

  useEffect(() => {
    // Dentro del efecto secundario, realiza la solicitud HTTP
    fetch('http://localhost:4000/api/socios/' + name)
      .then((response) => response.json())
      .then((data) => {
        // Actualiza el estado con los datos recibidos
        setInfo(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
      console.log('http://localhost:4000/api/productos/' + name);
      fetch('http://localhost:4000/api/productos/' + name)
      .then((response) => response.json())
      .then((data) => {
        // Actualiza el estado con los datos recibidos
        setProductos(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  ,[name]); // Usamos [nombre] como dependencia para que el efecto se ejecute cuando cambia el parámetro 'nombre'
    const descripcion = info_negocio.length > 0 ? info_negocio[0].descripcion : "No hay descripción disponible";
    const horario = info_negocio.length > 0 ? info_negocio[0].horario : "No hay horario disponible";
    const ubicacion = info_negocio.length > 0 ? info_negocio[0].ubicacion : "No hay ubicación disponible";
    console.log(negocio_productos);
  return (
    <div>
      <UserNavbar loggedIn={loggedIn}></UserNavbar>
      <div className="negocio-info">
        <div className="container-fluid row">
          <img
            src={defaultImage}
            alt="Imagen del negocio"
            className="img-fluid"
            style={{ height: '120px', width: '100%' }}
          />
          <div className="nombre">
            <h2>{name}</h2>
          </div>
          <div className="col-md-6">
            <h4>Descripción</h4>
            <p>{descripcion}</p>
            <h4>Ubicación</h4>
            <p>{ubicacion}</p>
            <h4>Horario</h4>
            <p>{horario}</p>
          </div>
          <div className="col-md-6">
            <h3>Productos</h3>
            <ListaCompras productos={negocio_productos} seccion='BusinessTemplate' onAdd={agregarProducto}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessTemplate;
