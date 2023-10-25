import React, { useState } from 'react';
import CustomNavbar from './components/UserNavbar';
import ListaCompras from './components/ListaCompras';
import './Home.css';
function Compras() {
  const [loggedIn, setLoggedIn] = useState(false);
  const productos = [
    { nombre: 'Producto 1', imagenURL: './default.png' },
    { nombre: 'Producto 2', imagenURL: './default.png' },
    // Agrega más productos aquí
  ];
  return (
    <div className="fondo">
      <CustomNavbar loggedIn={setLoggedIn} />
      <br></br>
      <div className='row'>
      <ListaCompras productos={productos} className='col-6' />
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

export default Compras;