import React, { useEffect, useState } from 'react';
import CustomNavbar from './components/UserNavbar';
import CardNegocio from './components/CardNegocio';
import './App.css';
function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  // Llama a la función para obtener la hora actual
  const [datos, setDatos] = useState([]);

  // Función para realizar la consulta a la API y actualizar los datos
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/socios');
      
      if (!response.ok) {
        throw new Error(`Error de red: ${response.status} - ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log(data); // Agregar este registro para ver la respuesta en la consola
      setDatos(data);
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };
  // Llama a fetchData() cuando el componente se monta y cada 5 segundos (puedes ajustar este intervalo)
  useEffect(() => {
    fetchData(); // Llama a fetchData() al montar el componente

    const intervalId = setInterval(() => {
      fetchData(); // Llama a fetchData() cada 5 segundos (5000 ms)
    }, 2000);

    // Limpia el intervalo cuando el componente se desmonta para evitar fugas de memoria
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return (
    <div className="fondo">
      <CustomNavbar loggedIn={setLoggedIn} />
      <br></br>
      <div className="container" style={{ marginTop: '20px' }}> {/* Agrega margen superior con estilos en línea */}
        <div className="row mx-auto">
        {datos.map((dato, index) => (
          <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <CardNegocio nombre={dato.nombre} />
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
    </div>
  );
}

export default Home;