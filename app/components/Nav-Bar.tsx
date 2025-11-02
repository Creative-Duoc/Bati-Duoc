"use client"; // <--- ESTA ES LA CLAVE PARA NEXT.JS
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function NavBar() {
  const [showCategorias, setShowCategorias] = useState(false);
  const router = useRouter();
  const handleMouseEnter = () => setShowCategorias(true);
  const handleMouseLeave = () => setShowCategorias(false);
  const handleCategoriasClick = () => {
    router.push("../categoria");
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary py-2">
      <Container fluid className="d-flex align-items-center justify-content-between">
        {/* Logo */}
        <Navbar.Brand href="#home">
          <div style={{ width: 48, height: 32 }} className="bg-secondary rounded d-flex align-items-center justify-content-center text-light fw-bold">
            logo
          </div>
        </Navbar.Brand>

        {/* Enlaces y dropdown originales */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <NavDropdown
              title={<span style={{ cursor: "pointer" }} onClick={handleCategoriasClick}>Categorías</span>}
              id="categorias-nav-dropdown"
              show={showCategorias}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <NavDropdown.Item href="/productos/categoria">Categoría 1</NavDropdown.Item>
              <NavDropdown.Item href="#categoria2">Categoría 2</NavDropdown.Item>
              <NavDropdown.Item href="#categoria3">Categoría 3</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#ofertas">Ofertas</Nav.Link>
            <Nav.Link href="#nosotros">Nosotros</Nav.Link>
            <Nav.Link href="#blog">Blog</Nav.Link>
            <Nav.Link href="#contacto">Contacto</Nav.Link>
          </Nav>

          {/* Buscador centrado */}
          <form className="d-flex mx-auto" style={{ maxWidth: 400, flex: 1, justifyContent: 'center' }}>
            <input
              type="text"
              placeholder="Buscar"
              className="form-control me-2"
              style={{ minWidth: 150 }}
            />
            <button type="submit" className="btn btn-outline-success">Buscar</button>
          </form>

          {/* Botón de carrito y botones de sesión a la derecha */}
          <div className="d-flex gap-2 ms-3 align-items-center">
            <button className="btn" style={{backgroundColor: '#22c55e', color: 'white', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px'}}>
              Carrito
            </button>
            <button className="btn btn-outline-primary">Iniciar Sesión</button>
            <button className="btn btn-primary">Crear Cuenta</button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
