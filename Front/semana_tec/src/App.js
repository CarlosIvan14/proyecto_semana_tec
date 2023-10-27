import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Home from './Home';
import BusinessTemplate from './components/BusinessTemplate';
import Carrito from './Carrito';
import Compras from './Compras';
import Perfil from './components/Perfil';
import FormSession from './components/FormSession';
import Ventas from './Ventas';
import Pedidos from './Pedidos';
import Perfil2 from './components/Perfil2';
function App() {
  return (
    <Router>
      <AuthProvider> {/* Envuelve toda la aplicación con el proveedor de contexto de autenticación */}
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Ventas" element={<Ventas />} />
            <Route path="/Pedidos" element={<Pedidos />} />
            <Route path="/Perfil2" element={<Perfil2 />} />
            <Route path="/negocio/:name" element={<BusinessTemplate />} />
            <Route path="/Compras" element={<Compras />} />
            <Route path="/Carrito" element={<Carrito />} />
            <Route path="/Perfil" element={<Perfil />} />
            <Route path="/FormSession" element={<FormSession />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
