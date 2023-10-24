import React, { useState } from 'react';
import CustomNavbar from './components/UserNavbar';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="App">
      <CustomNavbar loggedIn={setLoggedIn} />
      {/* Resto de tu contenido */}
    </div>
  );
}

export default App;

