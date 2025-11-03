"use client"; 
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useCarrito } from "./CarritoContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthContext";

function NavBar() {
  const { items } = useCarrito();
  const { isAuthenticated, logout, user } = useAuth();
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => { setIsMounted(true); }, []);
    const total = items.reduce((acc, item) => acc + Number(item.precio.replace(/[^\d]/g, "")) * item.cantidad, 0);
  const [showCategorias, setShowCategorias] = useState(false);
  const [hideTimeout, setHideTimeout] = useState<NodeJS.Timeout | null>(null);
  const router = useRouter();
  const handleMouseEnter = () => {
    if (hideTimeout) clearTimeout(hideTimeout);
    setShowCategorias(true);
  };
  const handleMouseLeave = () => {
    const timeout = setTimeout(() => setShowCategorias(false), 300); // 300 ms
    setHideTimeout(timeout);
  };
  const handleCategoriasClick = () => {
    router.push("../categoria");
  };

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
            <Nav.Link href="/">Home</Nav.Link>
            <NavDropdown
              title={<span style={{ cursor: "pointer" }} onClick={handleCategoriasClick}>Categorías</span>}
              id="categorias-nav-dropdown"
              show={showCategorias}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <NavDropdown.Item href="/categoria/Batidos">Batidos</NavDropdown.Item>
              <NavDropdown.Item href="/categoria/Donuts">Donuts</NavDropdown.Item>
              <NavDropdown.Item href="/categoria/Galletas">Galletas</NavDropdown.Item>
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
          {/* Icono de carrito y botones de sesión a la derecha */}
          <div className="d-flex gap-2 ms-3 align-items-center">
            {/* Icono de carrito con total */}
            <Link href="/carrito" passHref legacyBehavior>
              <button className="btn btn-success d-flex align-items-center px-3" title="Carrito" style={{ fontWeight: "bold" }}>
                Carrito {isMounted && total > 0 ? `$${total.toLocaleString()}` : ""}
              </button>
            </Link>

            {isMounted && isAuthenticated ? (
              <>
                <span className="navbar-text">Hola, {user?.email}</span>
                <button className="btn btn-outline-danger" onClick={logout}>
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <>
                {/* Botón Iniciar Sesión (Ruta /inicio-sesion) */}
                <Link href="/inicio-sesion" passHref legacyBehavior>
                  <button className="btn btn-outline-primary">
                    Iniciar Sesión
                  </button>
                </Link>
                {/* Botón Crear Cuenta (Ruta /crear-cuenta) */}
                <Link href="/crear-cuenta" passHref legacyBehavior>
                  <button className="btn btn-primary">Crear Cuenta</button>
                </Link>
              </>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
