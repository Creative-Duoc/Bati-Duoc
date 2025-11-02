"use client"; 
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import Link from "next/link";

function NavBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary py-2">
      <Container
        fluid
        className="d-flex align-items-center justify-content-between"
      >
        {/* Logo */}
        <Navbar.Brand>
          <Link
            href="/"
            className="text-decoration-none text-dark fw-bold d-flex align-items-center"
          >
            <div
              style={{
                width: 48,
                height: 32,
                backgroundColor: "#6c757d",
                borderRadius: 6,
              }}
              className="d-flex align-items-center justify-content-center text-light"
            >
              logo
            </div>
          </Link>
        </Navbar.Brand>

        {/* Enlaces y dropdown */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link href="/" className="nav-link">
              Home
            </Link>

            <NavDropdown title="Categorías" id="categorias-nav-dropdown">
              <Link href="/categoria1" className="dropdown-item">
                Categoría 1
              </Link>
              <Link href="/categoria2" className="dropdown-item">
                Categoría 2
              </Link>
              <Link href="/categoria3" className="dropdown-item">
                Categoría 3
              </Link>
            </NavDropdown>

            <Link href="/ofertas" className="nav-link">
              Ofertas
            </Link>
            <Link href="/nosotros" className="nav-link">
              Nosotros
            </Link>
            <Link href="/blog" className="nav-link">
              Blog
            </Link>
            <Link href="/contacto" className="nav-link">
              Contacto
            </Link>
          </Nav>

          {/* Buscador */}
          <form
            className="d-flex mx-auto"
            style={{ maxWidth: 400, flex: 1, justifyContent: "center" }}
          >
            <input
              type="text"
              placeholder="Buscar"
              className="form-control me-2"
              style={{ minWidth: 150 }}
            />
            <button type="submit" className="btn btn-outline-success">
              Buscar
            </button>
          </form>

          {/* Botones de sesión */}
          <div className="d-flex gap-2 ms-3">
            <button className="btn btn-outline-primary">Iniciar Sesión</button>
            <button className="btn btn-primary">Crear Cuenta</button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
