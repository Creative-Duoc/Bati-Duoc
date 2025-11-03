"use client";
import { useState } from "react";
import {
  Container,
  Form,
  Button,
  Card,
  Row,
  Col,
  Alert,
} from "react-bootstrap";
import Link from "next/link";

export default function CrearCuentaPage() {
  // 1. Estados para todos los campos del formulario
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [region, setRegion] = useState("");
  const [comuna, setComuna] = useState("");

  // 2. Estados para manejar los errores de validación
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});
  const [submitMessage, setSubmitMessage] = useState("");

  // Dominios permitidos según tu lógica original, simplificado para DuocUC o Gmail
  const ALLOWED_EMAIL_REGEX =
    /^[^@\s]{1,}@((duocuc\.cl)|(profesor\.duocuc\.cl)|(gmail\.com))$/i;

  // Lista de regiones/comunas para los selects
  const regions = [
    "Región Metropolitana de Santiago",
    "Región de la Araucanía",
    "Región de Ñuble",
  ];

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationErrors({});
    setSubmitMessage("");

    const errors: { [key: string]: string } = {};
    let isValid = true;

    // --- VALIDACIONES DE TU HTML ORIGINAL ADAPTADAS ---

    // Nombre (Max 100 caracteres)
    if (!name.trim()) {
      errors.name = "El nombre completo es requerido.";
      isValid = false;
    } else if (name.length > 100) {
      errors.name = "El nombre no puede exceder los 100 caracteres.";
      isValid = false;
    }

    // Correo (Validación de dominio)
    if (!email.trim()) {
      errors.email = "El correo es requerido.";
      isValid = false;
    } else if (!ALLOWED_EMAIL_REGEX.test(email)) {
      errors.email =
        "Solo se permiten correos @duocuc.cl, @profesor.duocuc.cl o @gmail.com.";
      isValid = false;
    }

    // Contraseña (Mínimo 6 caracteres)
    if (!password) {
      errors.password = "La contraseña es requerida.";
      isValid = false;
    } else if (password.length < 6) {
      errors.password = "La contraseña debe tener al menos 6 caracteres.";
      isValid = false;
    }

    // Confirmar Contraseña
    if (password !== confirmPassword) {
      errors.confirmPassword = "Las contraseñas no coinciden.";
      isValid = false;
    }

    // Región y Comuna (Requeridos)
    if (!region) {
      errors.region = "Debes seleccionar una región.";
      isValid = false;
    }
    if (!comuna) {
      errors.comuna = "Debes seleccionar una comuna.";
      isValid = false;
    }

    setValidationErrors(errors);

    if (isValid) {
      // Lógica para guardar el usuario en localStorage
      const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
      
      // Verificar si el email ya está registrado
      const userExists = storedUsers.some((user: any) => user.email === email);
      if (userExists) {
        setSubmitMessage("Error: El correo electrónico ya está registrado.");
        return;
      }

      // Guardar el nuevo usuario con toda la información
      const nameParts = name.trim().split(' ');
      const nombre = nameParts.shift() || '';
      const apellido = nameParts.join(' ');
      const newUser = { nombre, apellido, email, password, region, comuna };
      const updatedUsers = [...storedUsers, newUser];
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      console.log("Registro exitoso:", newUser);
      setSubmitMessage("¡Registro exitoso! Ya puedes iniciar sesión.");
    } else {
      setSubmitMessage("Error: Por favor, revisa los campos marcados.");
    }
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center py-5"
      style={{ minHeight: "100vh" }}
    >
      <Card style={{ width: "100%", maxWidth: "550px" }} className="shadow-lg">
        <Card.Header className="bg-light fw-bold text-center">
          Registro de Usuario
        </Card.Header>
        <Card.Body className="p-4">
          <h2 className="text-center mb-4 fw-bold text-primary">
            Crear Cuenta
          </h2>

          {submitMessage && (
            <Alert
              variant={submitMessage.includes("exitoso") ? "success" : "danger"}
            >
              {submitMessage}
            </Alert>
          )}

          <Form onSubmit={handleRegister}>
            {/* Nombre completo */}
            <Form.Group id="name" className="mb-3">
              <Form.Label>Nombre completo</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                isInvalid={!!validationErrors.name}
                maxLength={100}
                required
              />
              <Form.Control.Feedback type="invalid">
                {validationErrors.name}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Correo Electrónico */}
            <Form.Group id="email" className="mb-3">
              <Form.Label>Correo</Form.Label>
              <Form.Control
                type="text" // Usamos text para mostrar el feedback personalizado, aunque se valide como email
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isInvalid={!!validationErrors.email}
                required
              />
              <Form.Text className="text-muted">
                Ej: usuario@duocuc.cl o usuario@gmail.com
              </Form.Text>
              <Form.Control.Feedback type="invalid">
                {validationErrors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Row className="mb-3">
              {/* Contraseña */}
              <Col md={6}>
                <Form.Group id="password">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    isInvalid={!!validationErrors.password}
                    minLength={6}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {validationErrors.password}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              {/* Confirmar Contraseña */}
              <Col md={6}>
                <Form.Group id="confirmar">
                  <Form.Label>Confirmar contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    isInvalid={!!validationErrors.confirmPassword}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {validationErrors.confirmPassword}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            {/* Teléfono (Opcional) */}
            <Form.Group id="telefono" className="mb-3">
              <Form.Label>Teléfono (opcional)</Form.Label>
              <Form.Control
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Group>

            <Row className="mb-4">
              {/* Región */}
              <Col md={6}>
                <Form.Group id="region">
                  <Form.Label>Región</Form.Label>
                  <Form.Select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    isInvalid={!!validationErrors.region}
                    required
                  >
                    <option value="">Selecciona tu región...</option>
                    {regions.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {validationErrors.region}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              {/* Comuna */}
              <Col md={6}>
                <Form.Group id="comuna">
                  <Form.Label>Comuna</Form.Label>
                  <Form.Select
                    value={comuna}
                    onChange={(e) => setComuna(e.target.value)}
                    isInvalid={!!validationErrors.comuna}
                    required
                  >
                    <option value="">Selecciona tu comuna...</option>
                    {/* Comunas de ejemplo de tu HTML */}
                    <option>Limache</option>
                    <option>Lampa</option>
                    <option>Concepción</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {validationErrors.comuna}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            {/* Botón de Registro */}
            <Button type="submit" className="w-100 btn-primary fw-bold">
              Registrar
            </Button>
          </Form>

          <div className="w-100 text-center mt-3">
            ¿Ya tienes cuenta? <Link href="/inicio-sesion">Iniciar Sesión</Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
