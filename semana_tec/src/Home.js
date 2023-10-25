import React, { useState } from 'react';
import CustomNavbar from './components/UserNavbar';
import CardNegocio from './components/CardNegocio';
import './App.css';
function Home() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="fondo">
      <CustomNavbar loggedIn={setLoggedIn} />
      <br></br>
      <CardNegocio/>
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

export default Home;