"use client";
import { useState } from "react";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import Link from "next/link";
import { useAuth } from "../components/AuthContext";

export default function InicioSesionPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoginError("");

    if (!email || !password) {
      setLoginError("Por favor, ingresa tu correo y contraseña.");
      return;
    }

    try {
      // ------------------------------------------------------------------------------------------------
      // INICIO DE LA COMUNICACIÓN CON LA BASE DE DATOS (BACKEND)
      // ------------------------------------------------------------------------------------------------

      // 'await': Esperamos a que el servidor responda antes de continuar.
      // 'fetch': Hacemos la petición HTTP al endpoint de login.
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clients/login`, {
        
        // 'method: POST': Usamos POST porque estamos enviando credenciales (email y password) para ser verificadas.
        // Aunque no creamos un recurso nuevo, POST es más seguro que GET para enviar contraseñas.
        method: "POST",
        
        // 'headers': Indicamos que el cuerpo del mensaje es JSON.
        headers: {
          "Content-Type": "application/json",
        },
        
        // 'body': Convertimos el objeto { email, password } a texto JSON para enviarlo por la red.
        body: JSON.stringify({ email, password }),
      });

      // 'response.ok': Verificamos si el servidor aceptó la petición (status 200 OK).
      if (response.ok) {
        // 'response.text()': Leemos la respuesta cruda como texto.
        // Usamos text() en lugar de json() primero para verificar si viene vacía.
        const text = await response.text();
        
        // Si el texto está vacío, significa que el backend no encontró al usuario o la contraseña estaba mal
        // (dependiendo de cómo esté programado tu backend, a veces devuelve 200 OK pero body vacío si falla).
        if (!text) {
           setLoginError("El correo o la contraseña son incorrectos.");
           return;
        }

        // 'JSON.parse(text)': Convertimos el texto JSON recibido de la BD a un objeto JavaScript utilizable.
        // Este objeto 'userFound' contiene todos los datos de la tabla (id, nombre, email, etc.).
        const userFound = JSON.parse(text);
        
        // Eliminamos la contraseña antes de guardar en el contexto por seguridad.
        // 'const { password: _, ...userToLogin }': Desestructuración para separar 'password' del resto.
        const { password: _, ...userToLogin } = userFound;
        
        // Guardamos el usuario (que vino de la BD) en el estado global de la aplicación.
        login(userToLogin);
      } else {
        // Si el servidor responde con error (ej: 401 Unauthorized, 500 Server Error).
        setLoginError("El correo o la contraseña son incorrectos.");
      }
      // ------------------------------------------------------------------------------------------------
      // FIN DE LA COMUNICACIÓN CON LA BASE DE DATOS
      // ------------------------------------------------------------------------------------------------
    } catch (error) {
      console.error("Error de conexión:", error);
      setLoginError("Error de conexión con el servidor. Asegúrate de que el backend esté corriendo.");
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
            ¿No tienes cuenta? <Link href="crear-cuenta">Crear Cuenta</Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
