import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const initialLoggedIn = localStorage.getItem('auth') === 'true';
  const [loggedIn, setLoggedIn] = useState(initialLoggedIn);
  const [user, setUser] = useState(null); // Inicializado como null


  const login = (userData) => {
    console.log('userData antes de JSON.stringify:', userData);
const serializedUserData = JSON.stringify(userData);
console.log('serializedUserData:', serializedUserData);
    // Realiza la lógica de inicio de sesión y actualiza loggedIn y user
    setLoggedIn(true);
    setUser(userData); // Establece la información del usuario
    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('auth', 'true'); // Almacena en el localStorage
  };

  const logout = () => {
    // Realiza la lógica de cierre de sesión y actualiza loggedIn y user
    setLoggedIn(false);
    setUser(null); // Borra la información del usuario
    localStorage.removeItem('userData');
    // Elimina el estado de autenticación del localStorage
    localStorage.removeItem('auth');
  };

  return (
    <AuthContext.Provider value={{ loggedIn, login,  logout, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
