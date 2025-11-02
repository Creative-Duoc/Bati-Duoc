"use client";

import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function NavBar() {
  const [showCategorias, setShowCategorias] = useState(false);
  const hideTimeout = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  const handleMouseEnter = () => {
    if (hideTimeout.current) clearTimeout(hideTimeout.current);
    setShowCategorias(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => setShowCategorias(false), 300);
    hideTimeout.current = timeout;
  };

  const handleCategoriasClick = () => {
    router.push("/categoria");
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary py-2 shadow-sm">
      <Container
        fluid
        className="d-flex align-items-center justify-content-between"
      >
        {/* LOGO */}
        <Navbar.Brand>
          <Link
            href="/"
            className="text-decoration-none text-dark d-flex align-items-center gap-2"
          >
            <img
              src="/images/batiduocHD.png"
              alt="Logo Bati-Duoc"
              width={45}
              height={45}
              style={{
                borderRadius: "8px",
                objectFit: "contain",
                boxShadow: "0 0 6px rgba(0,0,0,0.2)",
              }}
            />
            <span className="fw-bold fs-5" style={{ color: "#2C3E50" }}>
              Bati-Duoc
            </span>
          </Link>
        </Navbar.Brand>

        {/* ENLACES Y DROPDOWN */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link href="/" className="nav-link">
              Home
            </Link>

            <NavDropdown
              title={
                <span
                  style={{ cursor: "pointer" }}
                  onClick={handleCategoriasClick}
                >
                  Categorías
                </span>
              }
              id="categorias-nav-dropdown"
              show={showCategorias}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <NavDropdown.Item href="/categoria/Batidos">
                Batidos
              </NavDropdown.Item>
              <NavDropdown.Item href="/categoria/Donuts">
                Donuts
              </NavDropdown.Item>
              <NavDropdown.Item href="/categoria/Galletas">
                Galletas
              </NavDropdown.Item>
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

          {/* BUSCADOR */}
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

          {/* BOTONES DE SESIÓN */}
          <div className="d-flex gap-2 ms-3">
            <Link href="/inicio-sesion" passHref legacyBehavior>
              <button className="btn btn-outline-primary">
                Iniciar Sesión
              </button>
            </Link>

            <Link href="/crear-cuenta" passHref legacyBehavior>
              <button className="btn btn-primary">Crear Cuenta</button>
            </Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
