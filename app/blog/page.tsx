"use client";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Blog() {
  return (
    <main className="container my-5">
      <h2 className="fw-bold text-center mb-5">NOTICIAS IMPORTANTES</h2>

      {/* Caso Curioso #1 - Batipalta */}
      <div className="row bg-light rounded-3 align-items-center mb-4 p-4">
        <div className="col-md-6">
          <h3 className="fw-bold">CASO CURIOSO #1 – Batipalta</h3>
          <p className="mb-4">
            Descubre cómo el <strong>Batipalta</strong> sorprendió a nuestros
            clientes con su mezcla cremosa de aguacate, kiwi, mango y naranja.
            Una experiencia exótica que refresca y energiza.
          </p>
          <a href="/blog/caso1" className="btn btn-outline-dark px-4 py-2 mb-2">
            VER CASO
          </a>
        </div>
        <div className="col-md-6 text-center">
          <img
            src="/images/imagenes_experiencias/EXPERIENCIA BATIPALTA.png"
            className="img-fluid rounded border"
            alt="Caso Batipalta"
          />
        </div>
      </div>

      {/* Caso Curioso #2 - Baticol */}
      <div className="row bg-light rounded-3 align-items-center mb-4 p-4">
        <div className="col-md-6">
          <h3 className="fw-bold">CASO CURIOSO #2 – Baticol</h3>
          <p className="mb-4">
            Conoce la experiencia única del <strong>Baticol</strong>, el batido
            verde definitivo con kale, manzana, aguacate y lima. Nutrición,
            frescura y energía natural en cada sorbo.
          </p>
          <a href="/blog/caso2" className="btn btn-outline-dark px-4 py-2 mb-2">
            VER CASO
          </a>
        </div>
        <div className="col-md-6 text-center">
          <img
            src="/images/imagenes_experiencias/Experiencia Bati-col.png"
            className="img-fluid rounded border"
            alt="Caso Baticol"
          />
        </div>
      </div>
    </main>
  );
}
