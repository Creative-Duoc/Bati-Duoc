"use client";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// Interfaces para tipado estricto
interface FormData {
  nombre: string;
  email: string;
  asunto: string;
  mensaje: string;
}

interface FormErrors {
  nombre?: string;
  email?: string;
  mensaje?: string;
}

export default function Contacto() {
  const [form, setForm] = useState<FormData>({
    nombre: "",
    email: "",
    asunto: "",
    mensaje: "",
  });
  const [error, setError] = useState<FormErrors>({});
  const [enviado, setEnviado] = useState(false);

  const correoRegex =
    /^[^@\s]{1,}@((duoc\.cl)|(profesor\.duoc\.cl)|(gmail\.com))$/i;

  const validarFormulario = (): FormErrors => {
    const errores: FormErrors = {};
    if (!form.nombre.trim())
      errores.nombre = "Por favor, ingresa tu nombre completo.";
    else if (form.nombre.length > 100)
      errores.nombre = "El nombre no puede exceder los 100 caracteres.";

    if (!form.email.trim()) errores.email = "El correo es obligatorio.";
    else if (!correoRegex.test(form.email))
      errores.email =
        "Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com.";

    if (!form.mensaje.trim())
      errores.mensaje = "Por favor, escribe un mensaje.";
    else if (form.mensaje.length > 500)
      errores.mensaje = "El mensaje no puede superar los 500 caracteres.";

    return errores;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errores = validarFormulario();
    setError(errores);

    if (Object.keys(errores).length === 0) {
      setEnviado(true);
      console.log("Formulario enviado:", form);
      setForm({ nombre: "", email: "", asunto: "", mensaje: "" });
      setTimeout(() => setEnviado(false), 4000);
    }
  };

  return (
    <main
      className="container py-5"
      style={{
        background: "linear-gradient(180deg, #f9fafc 0%, #eef2f7 100%)",
        borderRadius: "12px",
        boxShadow: "0 0 30px rgba(0, 0, 0, 0.08)",
      }}
    >
      <div className="text-center mb-5">
        <h2 className="fw-bold" style={{ color: "#2C3E50" }}>
          Contáctanos
        </h2>
        <p className="text-muted">
          ¿Tienes dudas o comentarios? Completa el formulario y nuestro equipo
          se pondrá en contacto contigo.
        </p>
      </div>

      <div className="row g-4 align-items-center">
        {/* Formulario */}
        <div className="col-md-6">
          <div
            className="p-4 bg-white rounded-4 shadow-sm border"
            style={{ transition: "transform 0.3s ease" }}
          >
            <form onSubmit={handleSubmit} noValidate>
              {/* Nombre */}
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label fw-semibold">
                  Nombre completo
                </label>
                <input
                  type="text"
                  id="nombre"
                  className={`form-control shadow-sm ${
                    error.nombre ? "is-invalid" : ""
                  }`}
                  placeholder="Ingresa tu nombre"
                  maxLength={100}
                  value={form.nombre}
                  onChange={handleChange}
                />
                {error.nombre && (
                  <div className="invalid-feedback">{error.nombre}</div>
                )}
              </div>

              {/* Email */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-semibold">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  className={`form-control shadow-sm ${
                    error.email ? "is-invalid" : ""
                  }`}
                  placeholder="tuemail@duoc.cl"
                  value={form.email}
                  onChange={handleChange}
                />
                {error.email && (
                  <div className="invalid-feedback">{error.email}</div>
                )}
              </div>

              {/* Asunto */}
              <div className="mb-3">
                <label htmlFor="asunto" className="form-label fw-semibold">
                  Asunto
                </label>
                <input
                  type="text"
                  id="asunto"
                  className="form-control shadow-sm"
                  placeholder="Motivo del contacto"
                  value={form.asunto}
                  onChange={handleChange}
                />
              </div>

              {/* Mensaje */}
              <div className="mb-3">
                <label htmlFor="mensaje" className="form-label fw-semibold">
                  Mensaje
                </label>
                <textarea
                  id="mensaje"
                  className={`form-control shadow-sm ${
                    error.mensaje ? "is-invalid" : ""
                  }`}
                  rows={5}
                  placeholder="Escribe tu mensaje aquí..."
                  maxLength={500}
                  value={form.mensaje}
                  onChange={handleChange}
                />
                {error.mensaje && (
                  <div className="invalid-feedback">{error.mensaje}</div>
                )}
              </div>

              {enviado && (
                <div className="alert alert-success mt-3">
                  ✅ ¡Tu mensaje fue enviado con éxito!
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary w-100 mt-3 shadow-sm"
                style={{
                  backgroundColor: "#27AE60",
                  borderColor: "#27AE60",
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#219150")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "#27AE60")
                }
              >
                Enviar mensaje
              </button>
            </form>
          </div>
        </div>

        {/* Información lateral */}
        <div className="col-md-6 text-center text-md-start px-4">
          <h5 className="fw-bold mb-3" style={{ color: "#2C3E50" }}>
            Información de contacto
          </h5>
          <p className="mb-1">
            <strong>📍 Dirección:</strong> Av. Siempre Viva 123, Santiago, Chile
          </p>
          <p className="mb-1">
            <strong>📞 Teléfono:</strong> +56 9 1234 5678
          </p>
          <p className="mb-4">
            <strong>📧 Email:</strong>{" "}
            <a
              href="mailto:contacto@bati-duoc.cl"
              className="text-decoration-none"
            >
              contacto@bati-duoc.cl
            </a>
          </p>

          <h6 className="fw-bold">Síguenos en redes sociales</h6>
          <div className="d-flex gap-3 justify-content-md-start justify-content-center mt-2">
            <a href="#" className="fs-5 text-primary text-decoration-none">
              🌐 Facebook
            </a>
            <a href="#" className="fs-5 text-danger text-decoration-none">
              📸 Instagram
            </a>
            <a href="#" className="fs-5 text-info text-decoration-none">
              🐦 Twitter
            </a>
          </div>

          <img
            src="/imagenes/imagenes_experiencias/teammanos.png"
            alt="Equipo Bati-Duoc"
            className="img-fluid mt-4 rounded-4 shadow-sm"
            style={{ maxWidth: "80%", border: "3px solid #27AE60" }}
          />
        </div>
      </div>
    </main>
  );
}
