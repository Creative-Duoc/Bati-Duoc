"use client";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function NavBar() {
  const [showCategorias, setShowCategorias] = useState(false);
  const [hideTimeout, setHideTimeout] = useState<NodeJS.Timeout | null>(null);
  const router = useRouter();

  const handleMouseEnter = () => {
    if (hideTimeout) clearTimeout(hideTimeout);
    setShowCategorias(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => setShowCategorias(false), 300);
    setHideTimeout(timeout);
  };

  const handleCategoriasClick = () => {
    router.push("../categoria");
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
            className="text-decoration-none text-dark fw-bold d-flex align-items-center gap-2"
          >
            <img
              src="/images/batiduocHD.png" // 🔹 cambia esta ruta según tu imagen
              alt="Logo Bati-Duoc"
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "10px",
                objectFit: "cover",
                boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
              }}
            />
            <span className="fw-bold fs-5" style={{ color: "#2C3E50" }}>
              Bati-Duoc
            </span>
          </Link>
        </Navbar.Brand>

        {/* Enlaces */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
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

          {/* Carrito y botones de sesión */}
          <div className="d-flex gap-2 ms-3 align-items-center">
            {/* Icono de carrito */}
            <Link href="/carrito" passHref legacyBehavior>
              <button
                className="btn btn-outline-secondary d-flex align-items-center"
                title="Carrito"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path
                    d="M1 1h2l.4 2M6 6h15l-1.5 9h-13z"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </Link>

            {/* Iniciar Sesión */}
            <Link href="/inicio-sesion" passHref legacyBehavior>
              <button className="btn btn-outline-primary">
                Iniciar Sesión
              </button>
            </Link>

            {/* Crear Cuenta */}
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
