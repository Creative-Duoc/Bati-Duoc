"use client"; // <--- ESTA ES LA CLAVE PARA NEXT.JS
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

function NavBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            {/* Cambié este Nav.Link para que sea el icono de Carrito de Compras */}
            <Nav.Link href="#carrito">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-cart-fill inline-block mr-1"
                viewBox="0 0 16 16"
                aria-label="Carrito de compras"
              >
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L5.8 10h8.2a.5.5 0 0 1 .491.408l.388 1.498A.5.5 0 0 1 15 13H1.5a.5.5 0 0 1-.5-.5zM14 10H5.539L4.254 5H14z" />
                <path d="M.5 2.5a.5.5 0 0 1 .5-.5h15a.5.5 0 0 1 0 1H1a.5.5 0 0 1-.5-.5z" />
              </svg>
              Carrito (0)
            </Nav.Link>

            <NavDropdown title="Tienda" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">
                Ver Productos
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Ofertas del Día
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Mi Cuenta</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
