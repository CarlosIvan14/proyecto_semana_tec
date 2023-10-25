import React from 'react';
import './CardNegocio.css';

function CardNegocio() {
    var nombre = "Negocio 1";
  // Llama a la función para obtener la hora actual

  return (
    <div className="custom-card">
      <div className="card-content">
      </div>
      <div className="card-footer">
        <a href="#" className="modal_link">
        {nombre && (
            <h5 className="numero">{nombre}</h5>
        )}
        </a>
      </div>
    </div>
  );
}

export default CardNegocio;
