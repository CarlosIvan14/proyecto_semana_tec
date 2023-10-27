import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext.js'; // Importa el contexto de autenticación
import SocioNavbar from './components/SocioNavbar';
import ListaCompras from './components/ListaCompras';
import './Ventas.css'

function Pedidos() {
    const [productos, setProductos] = useState([]); // Inicializado como un array vacío
    const [productos2, setProductos2] = useState([]); // Inicializado como un array vacío
    const [nombre, setNombre] = useState("No hay nombre disponible");
    useEffect(() => {
      // Cargar los datos del usuario desde el localStorage al montar el componente
      const storedUserData = localStorage.getItem('userData');
      if (storedUserData) {
        const userData = JSON.parse(storedUserData);
        setNombre(userData.nombre);
      }
    }, []);
    // Use el hook useEffect para cargar datos cuando el componente se monta
  useEffect(() => {
    // Realiza una solicitud GET al servidor
    fetch('http://localhost:4000/api/carrito-negocio/'+nombre)
      .then((response) => response.json())
      .then((data) => {
        // Actualiza el estado con los datos recibidos
        setProductos(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);
  const eliminarProducto = (productoAEliminar) => {
    fetch('http://localhost:4000/api/eliminar-pedido/' + productoAEliminar, {
      method: 'DELETE',
      // Otras opciones y cuerpo de la solicitud DELETE si es necesario
    })
      .then((response) => {
        if (response.ok) {
          // El producto se eliminó con éxito, actualiza la lista de productos
          fetch('http://localhost:4000/api/carrito-negocio/'+nombre)
            .then((response) => response.json())
            .then((data) => {
              setProductos(data);
            })
            .catch((error) => {
              console.error('Error al obtener productos:', error);
            });
        } else {
          console.error('Error al eliminar el producto');
        }
      })
      .catch((error) => {
        console.error('Error al eliminar el producto:', error);
      });
  };
  useEffect(() => {
     // Cargar los datos del usuario desde el localStorage al montar el componente
     const storedUserData = localStorage.getItem('userData');
     if (storedUserData) {
       const userData = JSON.parse(storedUserData);
       setNombre(userData.nombre);
     }
   }, []); 
    // Realiza una solicitud GET al servidor
    fetch('http://localhost:4000/api/compras-negocio/'+nombre)
      .then((response) => response.json())
      .then((data) => {
        // Actualiza el estado con los datos recibidos
        setProductos2(data);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  return (
    <div className="fondo">
      <SocioNavbar/>
      <br />
      <div className="" style={{ marginTop: '20px' }}>
        <div className="row mx-auto">
          <div className='col-6'>
            <h2>Pedidos Pendiente</h2>
            <ListaCompras productos={productos} seccion="carrito" onDelete={eliminarProducto} />
          </div>
          <div className='col-6 '>
            <div className='cont'>
                <h2>Pedidos Finalizados</h2>
                <ListaCompras productos={productos2} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pedidos;