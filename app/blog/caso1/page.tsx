"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";

export default function Caso1() {
  return (
    <main
      className="container py-5"
      style={{
        background: "linear-gradient(180deg, #f9fafc 0%, #eef2f7 100%)",
        borderRadius: "12px",
        boxShadow: "0 0 30px rgba(0, 0, 0, 0.08)",
      }}
    >
      {/* Encabezado */}
      <div className="text-center mb-5">
        <h2 className="fw-bold" style={{ color: "#2C3E50" }}>
          Caso Curioso #1 – Batipalta 🥑
        </h2>
        <p className="text-muted">
          Una historia inspiradora sobre cómo un simple batido de palta se
          transformó en el favorito de nuestros clientes por su sabor, frescura
          y valor nutricional.
        </p>
      </div>

      {/* Contenido principal */}
      <div className="row align-items-center g-4">
        {/* Imagen */}
        <div className="col-md-6 text-center">
          <Image
            src="/imagenes/imagenes_experiencias/EXPERIENCIA BATIPALTA.png"
            alt="Experiencia Batipalta"
            width={700}
            height={475}
            className="img-fluid rounded-4 shadow-sm"
            style={{ border: "3px solid #27AE60", maxWidth: "90%", height: "auto" }}
          />
        </div>

        {/* Texto */}
        <div className="col-md-6">
          <div className="bg-white p-4 rounded-4 shadow-sm border">
            <h4 className="fw-bold" style={{ color: "#27AE60" }}>
              La combinación perfecta de sabor y bienestar
            </h4>
            <p className="mt-3 text-secondary">
              Todo comenzó cuando un grupo de estudiantes del Duoc UC decidió
              experimentar con una idea poco convencional: convertir el
              <strong> aguacate </strong> en la base de un batido saludable. Su
              textura cremosa y su alto valor nutricional lo hicieron ideal para
              crear una bebida que fuera tanto deliciosa como energizante.
            </p>
            <p className="text-secondary">
              Tras varias pruebas, nació el <strong>Batipalta</strong> —una
              mezcla de palta, kiwi, mango y jugo de naranja— pensada para
              revitalizar el cuerpo y la mente. Su éxito fue inmediato, ganando
              popularidad entre quienes buscan opciones naturales y
              equilibradas.
            </p>
            <p className="text-secondary">
              Hoy, el Batipalta es uno de nuestros productos más icónicos,
              símbolo de innovación y del espíritu creativo de Bati-Duoc.
            </p>
          </div>
        </div>
      </div>

      {/* Sección extra */}
      <section className="mt-5">
        <div className="p-4 bg-white rounded-4 shadow-sm border text-center">
          <h5 className="fw-bold mb-3" style={{ color: "#2C3E50" }}>
            🥤 Ingredientes Clave del Batipalta
          </h5>
          <div className="row justify-content-center text-muted">
            <div className="col-6 col-md-3">
              <p>🥑 Palta fresca</p>
            </div>
            <div className="col-6 col-md-3">
              <p>🥭 Mango maduro</p>
            </div>
            <div className="col-6 col-md-3">
              <p>🥝 Kiwi verde</p>
            </div>
            <div className="col-6 col-md-3">
              <p>🍊 Jugo natural de naranja</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cierre */}
      <div className="text-center mt-5">
        <a
          href="/blog"
          className="btn btn-outline-success px-4 py-2 shadow-sm"
          style={{ borderRadius: "8px" }}
        >
          ← Volver al Blog
        </a>
      </div>
    </main>
  );
}
