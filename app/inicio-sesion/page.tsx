"use client";
import { useState } from "react";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import Link from "next/link";

export default function InicioSesionPage() {
  // 1. Estado para campos del formulario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // 2. Estado para mensajes de error y estado de validación
  const [emailError, setEmailError] = useState("");
  const [loginError, setLoginError] = useState("");

  const DOMAIN = "@duocuc.cl";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");
    setLoginError("");

    // *** VALIDACIÓN PRINCIPAL REQUERIDA ***
    if (!email.includes(DOMAIN)) {
      setEmailError(
        `El correo debe ser institucional y contener el dominio "${DOMAIN}".`
      );
      return; // Detiene el envío si falla la validación
    }

    // Validación de campos vacíos simple
    if (!email || !password) {
      setLoginError("Por favor, ingresa tu correo y contraseña.");
      return;
    }

    // Si todas las validaciones pasan, se procede con la lógica de inicio de sesión
    // (Aquí iría la llamada a la API o a Firebase para autenticación)
    console.log("Intento de inicio de sesión:", { email, password });
    setLoginError("Inicio de sesión simulado exitoso. Redirigiendo...");

    // En un app real, aquí se redirigiría al usuario al dashboard
    // Ejemplo de redirección: router.push('/dashboard');
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "85vh" }}
    >
      <Card style={{ width: "100%", maxWidth: "400px" }} className="shadow-lg">
        <Card.Body className="p-4">
          <h2 className="text-center mb-4 fw-bold text-primary">
            Iniciar Sesión
          </h2>
          {loginError && (
            <Alert
              variant={loginError.includes("exitoso") ? "success" : "danger"}
            >
              {loginError}
            </Alert>
          )}

          <Form onSubmit={handleLogin}>
            {/* Campo Correo Electrónico */}
            <Form.Group id="email" className="mb-3">
              <Form.Label>Correo Institucional</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="ejemplo@duocuc.cl"
                isInvalid={!!emailError} // Marcar como inválido si hay error
              />
              {/* Mensaje de error personalizado */}
              <Form.Control.Feedback type="invalid">
                {emailError}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Campo Contraseña */}
            <Form.Group id="password" className="mb-4">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </Form.Group>

            {/* Botón de Submit */}
            <Button type="submit" className="w-100 btn-primary fw-bold">
              Ingresar
            </Button>
          </Form>

          <div className="w-100 text-center mt-3">
            <Link href="#recuperar-contraseña">¿Olvidaste tu Contraseña?</Link>
          </div>

          <div className="w-100 text-center mt-2">
            ¿No tienes cuenta? <Link href="crear-cuenta">Crear Cuenta</Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
