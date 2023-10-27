import React, { useState, useEffect } from 'react';
import CustomNavbar from './components/UserNavbar';
import ListaCompras from './components/ListaCompras';
import defaultImage from './metodos_pago.png';
import './Home.css';
import { useAuth } from './AuthContext.js'; // Importa el contexto de autenticación
import { useNavigate } from 'react-router-dom';
function Compras() {
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
  const [productos, setProductos] = useState([]); // Inicializado como un array vacío
  const navigate = useNavigate();

  function pagar() {
    // Realiza una solicitud a tu API para procesar el pago con el ID del producto
    fetch(`http://localhost:4000/api/actualizar-pedido`, {
      method: 'PUT', // Puedes ajustar el método HTTP según tus necesidades
      // Otras opciones y cuerpo de la solicitud POST si es necesario
    })
      .then((response) => {
        if (response.ok) {
          // El pago se realizó con éxito, aquí puedes manejar la respuesta
          console.log('Pago exitoso');
          navigate('/Compras');
          // Puedes redirigir al usuario a una página de confirmación o hacer cualquier otra acción necesaria.
        } else {
          console.error('Error al procesar el pago');
        }
      })
      .catch((error) => {
        console.error('Error al procesar el pago:', error);
      });
  }  
  // Función para eliminar un producto
  const eliminarProducto = (productoAEliminar) => {
    fetch('http://localhost:4000/api/eliminar-pedido/' + productoAEliminar, {
      method: 'DELETE',
      // Otras opciones y cuerpo de la solicitud DELETE si es necesario
    })
      .then((response) => {
        if (response.ok) {
          // El producto se eliminó con éxito, actualiza la lista de productos
          fetch('http://localhost:4000/api/carrito/'+nombre)
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

  // Use el hook useEffect para cargar datos cuando el componente se monta
  useEffect(() => {
    // Realiza una solicitud GET al servidor
    fetch('http://localhost:4000/api/carrito/'+nombre)
      .then((response) => response.json())
      .then((data) => {
        // Actualiza el estado con los datos recibidos
        setProductos(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [nombre]);

  return (
    <div className="fondo">
      <CustomNavbar loggedIn={loggedIn}/>
      <br></br>
      <div className="row container-fluid">
        <div className="col-6">
          <h2>Carrito</h2>
          <ListaCompras productos={productos} seccion="carrito" onDelete={eliminarProducto} />
        </div>
        <div className="col-6 conte">
          <div className="contenedor-img">
            <h2>Metodos de pago</h2>
            <img src={defaultImage} className="img-car" alt="Métodos de pago" />
            <br></br>
            <button className="btn-primary" onClick={pagar}>Pagar</button>
          </div>
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
      {loggedIn ? (
        <p>Usuario autenticado. Muestra contenido específico para usuarios autenticados.</p>
      ) : (
        <p>Usuario no autenticado. Muestra contenido para usuarios no autenticados.</p>
      )}
    </div>
  );
}

export default Compras;
