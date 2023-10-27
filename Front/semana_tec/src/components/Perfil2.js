import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import defaultImage from './default.png';
import ListaCompras from './ListaCompras';
import './BusinessTemplate.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext.js'; // Importa el contexto de autenticación
import SocioNavbar from './SocioNavbar';
import { Link } from 'react-router-dom';
const Perfil2 = () => {
  const [nombre, setNombre] = useState("No hay nombre disponible");

  useEffect(() => {
    // Cargar los datos del usuario desde el localStorage al montar el componente
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setNombre(userData.nombre);
    }
  }, []);
  const { loggedIn,logout } = useAuth(); // Accede al estado de sesión desde el contexto de autenticación
  const navigate = useNavigate();
  const [info_negocio, setInfo] = useState([]);
  const [productos, setProductos] = useState([]); // Inicializado como un array vacío
  useEffect(() => {
    // Realiza una solicitud GET al servidor
    fetch('http://localhost:4000/api/productos/'+nombre) 
      .then((response) => response.json())
      .then((data) => {
        // Actualiza el estado con los datos recibidos
        setProductos(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);
  useEffect(() => {
    // Dentro del efecto secundario, realiza la solicitud HTTP
    fetch('http://localhost:4000/api/socios/' + nombre) 
      .then((response) => response.json())
      .then((data) => {
        // Actualiza el estado con los datos recibidos
        setInfo(data);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  ,[nombre]); // Usamos [nombre] como dependencia para que el efecto se ejecute cuando cambia el parámetro 'nombre'
    const descripcion = info_negocio.length > 0 ? info_negocio[0].descripcion : "No hay descripción disponible";
    const horario = info_negocio.length > 0 ? info_negocio[0].horario : "No hay horario disponible";
    const ubicacion = info_negocio.length > 0 ? info_negocio[0].ubicacion : "No hay ubicación disponible";
  return (
    <div>
      <SocioNavbar loggedIn={loggedIn}></SocioNavbar>
      <div className="negocio-info">
        <div className="container-fluid row">
          <img
            src={defaultImage}
            alt="Imagen del negocio"
            className="img-fluid"
            style={{ height: '120px', width: '100%' }}
          />
          <div className="nombre">
            <h2>{nombre}</h2>
          </div>
          <div className="col-md-6">
            <h4>Descripción</h4>
            <p>{descripcion}</p>
            <h4>Ubicación</h4>
            <p>{ubicacion}</p>
            <h4>Horario</h4>
            <p>{horario}</p>
            <Link to='/'>
            <button onClick={logout} className='btn btn-danger'>
                Cerrar Sesión
            </button>
            </Link>
          </div>
          <div className="col-md-6">
            <h4>Productos disponibles</h4>
            <ListaCompras productos={productos}></ListaCompras>
            <button className='btn btn-success'>
                Agregar Producto
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil2;