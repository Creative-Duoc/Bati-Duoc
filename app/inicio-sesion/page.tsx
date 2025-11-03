"use client";
import { useState } from "react";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import Link from "next/link";
import { useAuth } from "../components/AuthContext";

export default function InicioSesionPage() {
  const { login } = useAuth();
  // 1. Estado para campos del formulario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // 2. Estado para mensajes de error y estado de validación
  const [loginError, setLoginError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    // 1. Validación de campos vacíos
    if (!email || !password) {
      setLoginError("Por favor, ingresa tu correo y contraseña.");
      return;
    }

    // 2. Obtener usuarios de localStorage
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");

    // 3. Buscar al usuario por email
    const userFound = storedUsers.find(
      (user: any) => user.email === email
    );

    // 4. Validar usuario y contraseña
    if (userFound && userFound.password === password) {
      // ¡Éxito! Llamar a la función de login del contexto
      const { password, ...userToLogin } = userFound;
      login(userToLogin);
    } else {
      // Error: credenciales incorrectas
      setLoginError("El correo o la contraseña son incorrectos.");
    }
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
              />
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
            ¿No tienes cuenta? <Link href="#crear-cuenta">Crear Cuenta</Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
