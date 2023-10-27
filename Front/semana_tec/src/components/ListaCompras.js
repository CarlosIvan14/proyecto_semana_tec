import React from 'react';
import Producto from './Producto';
import defaultImage from './default.png';
import './ListaCompra.css';
const ListaCompras = ({ productos, seccion, onDelete ,onAdd}) => {
  return (
    <div className="lista-compras">
      <div className="productos">
        {productos.map((producto, index) => (
          <div key={index} className="producto">
            <Producto
              nombre={producto.nombre || producto.producto}
              precio={producto.precio}
              id= {producto.id}
              imagenURL={producto.imagen}
            />
            {seccion === 'carrito' && (
              <div className='but'>
              <button onClick={() => onDelete(producto.id)} className='circle-button'>X</button>
              </div>
            )}
            {seccion === 'BusinessTemplate' && (
              <button onClick={() => onAdd(producto.nombre)} className='btn btn-success'>+</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListaCompras;
