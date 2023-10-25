import * as React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // Asegúrate de importar 'Routes' también
import Home from './Home';
import Compras from './Compras';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Routes> {/* Aquí envuelve tus rutas en un elemento <Routes> */}
            <Route path="/" element={<Home />} />
            <Route path="/Compras" element={<Compras />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;

