"use client";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Contacto() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [asunto, setAsunto] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState({});
  const [enviado, setEnviado] = useState(false);

  const validarFormulario = () => {
    const errores: any = {};
    const correoRegex = /^[^@\s]{1,}@((duoc\.cl)|(profesor\.duoc\.cl)|(gmail\.com))$/i;

    if (!nombre.trim()) errores.nombre = "El nombre es requerido.";
    else if (nombre.length > 100)
      errores.nombre = "El nombre no puede exceder los 100 caracteres.";

    if (!email.trim()) errores.email = "El correo es requerido.";
    else if (!correoRegex.test(email))
      errores.email =
        "Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com.";
    else if (email.length > 100)
      errores.email = "El correo no puede exceder los 100 caracteres.";

    if (!mensaje.trim()) errores.mensaje = "El mensaje es requerido.";
    else if (mensaje.length > 500)
      errores.mensaje = "El mensaje no puede exceder los 500 caracteres.";

    return errores;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const errores = validarFormulario();
    setError(errores);

    if (Object.keys(errores).length === 0) {
      setEnviado(true);
      console.log("Formulario enviado:", { nombre, email, asunto, mensaje });
      setNombre("");
      setEmail("");
      setAsunto("");
      setMensaje("");
      setTimeout(() => setEnviado(false), 4000);
    }
  };

  return (
    <main className="container my-5">
      <h2 className="fw-bold text-center mb-4">Contáctanos</h2>
      <div className="row">
        {/* Formulario */}
        <div className="col-md-6 mb-4">
          <form onSubmit={handleSubmit} noValidate>
            {/* Nombre */}
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">
                Nombre completo
              </label>
              <input
                type="text"
                id="nombre"
                className={`form-control ${error.nombre ? "is-invalid" : ""}`}
                placeholder="Ingresa tu nombre"
                maxLength={100}
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
              {error.nombre && (
                <div className="invalid-feedback">{error.nombre}</div>
              )}
            </div>

            {/* Correo */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                className={`form-control ${error.email ? "is-invalid" : ""}`}
                placeholder="tuemail@ejemplo.com"
                maxLength={100}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {error.email && (
                <div className="invalid-feedback">{error.email}</div>
              )}
            </div>

            {/* Asunto */}
            <div className="mb-3">
              <label htmlFor="asunto" className="form-label">
                Asunto
              </label>
              <input
                type="text"
                id="asunto"
                className="form-control"
                placeholder="Motivo del contacto"
                value={asunto}
                onChange={(e) => setAsunto(e.target.value)}
                required
              />
            </div>

            {/* Mensaje */}
            <div className="mb-3">
              <label htmlFor="mensaje" className="form-label">
                Mensaje
              </label>
              <textarea
                id="mensaje"
                className={`form-control ${error.mensaje ? "is-invalid" : ""}`}
                rows={5}
                placeholder="Escribe tu mensaje aquí..."
                maxLength={500}
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                required
              />
              {error.mensaje && (
                <div className="invalid-feedback">{error.mensaje}</div>
              )}
            </div>

            {enviado && (
              <div className="alert alert-success">
                ¡Mensaje enviado con éxito!
              </div>
            )}

            <button type="submit" className="btn btn-primary w-100">
              Enviar mensaje
            </button>
          </form>
        </div>

        {/* Información de contacto */}
        <div className="col-md-6">
          <h5 className="fw-bold mb-3">Información</h5>
          <p>
            <strong>Dirección:</strong> Av. Siempre Viva 123, Santiago, Chile
          </p>
          <p>
            <strong>Teléfono:</strong> +56 9 1234 5678
          </p>
          <p>
            <strong>Email:</strong> contacto@bati-duoc.cl
          </p>
          <hr />
          <h5 className="fw-bold mb-3">Redes Sociales</h5>
          <p>
            <a href="#" className="me-3 text-decoration-none">
              🌐 Facebook
            </a>
            <a href="#" className="me-3 text-decoration-none">
              📸 Instagram
            </a>
            <a href="#" className="text-decoration-none">
              🐦 Twitter
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
