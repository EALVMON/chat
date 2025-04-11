
import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import { useMessContext } from './MessContext';
import './NavigationBar.css';

function NavigationBar() {
  const { chats } = useMessContext(); // Acceder a los chats desde el contexto

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Inicio</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>

            {/* Dropdown de Contactos */}
            <NavDropdown title="Contactos" id="basic-nav-dropdown">
              {/* Iterar sobre los chats y renderizar cada contacto */}
              {chats.map((chat, index) => (
                <NavDropdown.Item 
                  as={Link} 
                  to={`/contacto/${chat.contacto}`} 
                  key={index}
                >
                  {chat.contacto}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;