"use client"; // Necesario para usar hooks como Link
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import Link from "next/link"; // Importamos el componente Link de Next.js

function NavBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary py-2">
           {" "}
      <Container
        fluid
        className="d-flex align-items-center justify-content-between"
      >
                {/* Logo (Usamos Link para ir al inicio) */}       {" "}
        <Navbar.Brand as={Link} href="/">
                   {" "}
          <div
            style={{ width: 48, height: 32 }}
            className="bg-secondary rounded d-flex align-items-center justify-content-center text-light fw-bold"
          >
                        logo          {" "}
          </div>
                 {" "}
        </Navbar.Brand>
                {/* Enlaces y dropdown originales */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />       {" "}
        <Navbar.Collapse id="basic-navbar-nav">
                   {" "}
          <Nav className="me-auto">
                       {" "}
            <Nav.Link as={Link} href="/">
              Home
            </Nav.Link>
                       {" "}
            <NavDropdown title="Categorías" id="categorias-nav-dropdown">
                           {" "}
              <NavDropdown.Item href="#categoria1">
                Categoría 1
              </NavDropdown.Item>
                           {" "}
              <NavDropdown.Item href="#categoria2">
                Categoría 2
              </NavDropdown.Item>
                           {" "}
              <NavDropdown.Item href="#categoria3">
                Categoría 3
              </NavDropdown.Item>
                         {" "}
            </NavDropdown>
                        <Nav.Link href="#ofertas">Ofertas</Nav.Link>           {" "}
            <Nav.Link href="#nosotros">Nosotros</Nav.Link>           {" "}
            <Nav.Link href="#blog">Blog</Nav.Link>           {" "}
            <Nav.Link href="#contacto">Contacto</Nav.Link>         {" "}
          </Nav>
                    {/* Buscador centrado */}         {" "}
          <form
            className="d-flex mx-auto"
            style={{ maxWidth: 400, flex: 1, justifyContent: "center" }}
          >
                       {" "}
            <input
              type="text"
              placeholder="Buscar"
              className="form-control me-2"
              style={{ minWidth: 150 }}
            />
                       {" "}
            <button type="submit" className="btn btn-outline-success">
              Buscar
            </button>
                     {" "}
          </form>
                    {/* Botones de sesión a la derecha */}         {" "}
          <div className="d-flex gap-2 ms-3">
                        {/* Botón Iniciar Sesión (Ruta /inicio-sesion) */}
            <Link href="/inicio-sesion" passHref legacyBehavior>
              <button className="btn btn-outline-primary">
                Iniciar Sesión
              </button>
            </Link>
                        {/* Botón Crear Cuenta (Ruta /crear-cuenta) */}         
             {" "}
            <Link href="/crear-cuenta" passHref legacyBehavior>
              <button className="btn btn-primary">Crear Cuenta</button>
            </Link>
                     {" "}
          </div>
                 {" "}
        </Navbar.Collapse>
             {" "}
      </Container>
         {" "}
    </Navbar>
  );
}

export default NavBar;
