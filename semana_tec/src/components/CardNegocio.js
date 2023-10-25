import React from 'react';
import './CardNegocio.css';

function CardNegocio(props) {
  const { nombre, ubicacion } = props;
  
  return (
    <div className="custom-card">
      <div className="card-content">
        {nombre && <h5 className="numero">{nombre}</h5>}
        {ubicacion && <p>Ubicación: {ubicacion}</p>}
      </div>
      <div className="card-footer">
        <a href="#" className="modal_link">
          {/* Tu contenido adicional de la tarjeta */}
        </a>
      </div>
    </div>
  );
}


export default CardNegocio;
