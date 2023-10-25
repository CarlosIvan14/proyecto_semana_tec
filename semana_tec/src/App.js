import React, { useState } from 'react';
import CustomNavbar from './components/UserNavbar';
import CardNegocio from './components/CardNegocio';
function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="App">
      <CustomNavbar loggedIn={setLoggedIn} />
      <CardNegocio/>
      {/* Resto de tu contenido */}
    </div>
  );
}

export default App;

