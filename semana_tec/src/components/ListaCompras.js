import React from 'react';
import Producto from './Producto';
import './default.png'
const ListaCompras = ({ productos }) => {
  return (
    <div className="lista-compras">
      <h2>Lista de Compras</h2>
      <div className="productos">
        {productos.map((producto, index) => (
          <Producto
            key={index}
            nombre={producto.nombre}
            imagenURL={'./default.png'}
          />
        ))}
      </div>
    </div>
  );
};

export default ListaCompras;
