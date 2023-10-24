import React from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { FaSearch, FaFilter, FaUser } from 'react-icons/fa';
import './UserNavbar.css';
const UserNavbar = ({ loggedIn }) => {
  return (
    <Navbar bg="#FFBD59" expand="lg">
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto row">
          <Nav.Link href="#home" className='col-1'>Home</Nav.Link>
          <Nav.Link href="#compras" className='col-1'>Compras</Nav.Link>
          <Nav.Link href="#carrito" className='col-1'>Carrito</Nav.Link>
          <Form className='col-6'>
          <FormControl type="text" placeholder="Buscar" className="mr-sm-2" />
          <Button variant="light">
            <FaSearch />
          </Button>
          <Button variant="light" className="ml-2">
            <FaFilter />
          </Button>
        </Form>

        {loggedIn ? (
          <Button variant="light" className="ml-2">
            <FaUser />
          </Button>
        ) : (
          <Button variant="light" className="ml-2">
            Iniciar Sesión 
          </Button>
        )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default UserNavbar;
