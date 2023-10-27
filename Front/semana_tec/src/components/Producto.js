import React, { useState, useEffect } from 'react';
import './Producto.css';

const Producto = ({ nombre, descripcion, precio, imagenURL }) => {
  const [imagen, setImagen] = useState(null);

  useEffect(() => {
    // Utiliza import() para cargar la imagen de forma dinámica
    import(`./${imagenURL}`)
      .then((image) => {
        setImagen(image.default); // Asigna la imagen al estado
      })
      .catch((error) => {
        console.error('Error al cargar la imagen', error);
      });
  }, [imagenURL]);

  return (
    <div className="producto">
      {imagen && <img src={imagen} alt={nombre} className='producto-imagen' />}
      <div className="producto-informacion">
        <div className="producto-nombre">{nombre}</div>
        <div className="producto-precio">${precio}.00</div>
      </div>
    </div>
  );
};

export default Producto;


