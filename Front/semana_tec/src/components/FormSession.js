import React, {useState} from 'react';
import UserNavbar from './UserNavbar';
import './FormSession.css';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';



const FormSession = () => {

  return (
    <div className='fondo'>
      <UserNavbar></UserNavbar>
      <div className='row container'>
        <div className='col-6 fondo2'>
            <LoginForm></LoginForm>
        </div>
        <div className='col-6 fondo2'>
            <RegistrationForm/>
        </div>
      </div>
    </div>
  );
};

export default FormSession;