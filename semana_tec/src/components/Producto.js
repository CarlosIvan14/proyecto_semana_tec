import React from 'react';
import './Producto.css';

const Producto = ({ nombre, imagenURL }) => {
    imagenURL= './default.png';
  return (
    <div className="producto">
      <div className="producto-nombre">{nombre}</div>
      <img src='vista2.jpg' alt={nombre} className="producto-imagen" />
    </div>
  );
};

export default Producto;
