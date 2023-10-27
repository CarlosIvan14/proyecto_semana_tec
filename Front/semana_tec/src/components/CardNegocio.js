import React from 'react';
import './CardNegocio.css';

function CardNegocio(props) {
  const { nombre, ubicacion } = props;
  
  return (
    <div className="custom-card">
      <div className="card-content">
      </div>
      <div className="card-footer">
        {nombre && (
              <a className="numero">{nombre}</a>
          )}
      </div>
    </div>
  );
}


export default CardNegocio;
