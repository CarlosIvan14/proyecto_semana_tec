import React, { useEffect, useState } from 'react';
import CustomNavbar from './components/UserNavbar';
import CardNegocio from './components/CardNegocio';
import { Link } from 'react-router-dom';
import UserNavbar from './components/UserNavbar';
import { useAuth } from './AuthContext.js'; // Importa el contexto de autenticación

function Home() {
  const { loggedIn } = useAuth(); // Accede al estado de sesión desde el contexto de autenticación
  const [datos, setDatos] = useState([]);

  // Función para realizar la consulta a la API y actualizar los datos
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/socios');
      const data = await response.json();
      setDatos(data);
      console.log(data);
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  }

  useEffect(() => {
    fetchData(); // Llama a fetchData() al montar el componente

    // Limpia el intervalo cuando el componente se desmonta para evitar fugas de memoria
  }, []);

  return (
    <div className="fondo">
      <UserNavbar loggedIn={loggedIn}/>
      <br />
      <div className="container" style={{ marginTop: '20px' }}>
        <div className="row mx-auto">
          {datos.map((negocio, index) => (
            <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <Link to={`/negocio/${negocio.nombre}`}>
                <CardNegocio nombre={negocio.nombre} />
              </Link>
            </div>
          ))}
        </div>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
}

export default Home;
