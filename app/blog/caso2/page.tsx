"use client";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Caso2() {
  return (
    <main
      className="container py-5"
      style={{
        background: "linear-gradient(180deg, #f6fbf7 0%, #e9f5ec 100%)",
        borderRadius: "12px",
        boxShadow: "0 0 30px rgba(0, 0, 0, 0.08)",
      }}
    >
      {/* Encabezado */}
      <div className="text-center mb-5">
        <h2 className="fw-bold" style={{ color: "#1E8449" }}>
          Caso Curioso #2 – Baticol 🥬
        </h2>
        <p className="text-muted">
          La historia detrás del batido verde más famoso de Bati-Duoc. Una
          combinación natural que demuestra que la salud y el sabor pueden ir de
          la mano.
        </p>
      </div>

      {/* Contenido principal */}
      <div className="row align-items-center g-4">
        {/* Imagen */}
        <div className="col-md-6 text-center">
          <img
            src="/imagenes/imagenes_experiencias/Experiencia Bati-col.png"
            alt="Experiencia Baticol"
            className="img-fluid rounded-4 shadow-sm"
            style={{ border: "3px solid #1E8449", maxWidth: "90%" }}
          />
        </div>

        {/* Texto descriptivo */}
        <div className="col-md-6">
          <div className="bg-white p-4 rounded-4 shadow-sm border">
            <h4 className="fw-bold" style={{ color: "#239B56" }}>
              El equilibrio perfecto entre energía y frescura
            </h4>
            <p className="mt-3 text-secondary">
              El <strong>Baticol</strong> nació como parte de nuestra búsqueda
              por crear un batido verde nutritivo que no sacrificara el sabor.
              Su fórmula combina{" "}
              <strong>kale, manzana verde, aguacate y lima</strong>, logrando
              una textura suave y un perfil refrescante que revitaliza el cuerpo
              desde el primer sorbo.
            </p>
            <p className="text-secondary">
              Este batido se ha convertido en la opción ideal para quienes
              buscan un impulso natural antes del entrenamiento o simplemente
              desean una bebida saludable y deliciosa durante el día.
            </p>
            <p className="text-secondary">
              El éxito del Baticol radica en su equilibrio: energía limpia,
              ingredientes orgánicos y un sabor único que representa la
              filosofía de <strong>Bati-Duoc</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Ingredientes */}
      <section className="mt-5">
        <div className="p-4 bg-white rounded-4 shadow-sm border text-center">
          <h5 className="fw-bold mb-3" style={{ color: "#1E8449" }}>
            🌿 Ingredientes Clave del Baticol
          </h5>
          <div className="row justify-content-center text-muted">
            <div className="col-6 col-md-3">
              <p>🥬 Kale fresco</p>
            </div>
            <div className="col-6 col-md-3">
              <p>🍏 Manzana verde</p>
            </div>
            <div className="col-6 col-md-3">
              <p>🥑 Aguacate</p>
            </div>
            <div className="col-6 col-md-3">
              <p>🍈 Lima natural</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cierre */}
      <div className="text-center mt-5">
        <a
          href="/blog"
          className="btn btn-outline-success px-4 py-2 shadow-sm"
          style={{
            borderRadius: "8px",
            color: "#1E8449",
            borderColor: "#1E8449",
          }}
        >
          ← Volver al Blog
        </a>
      </div>
    </main>
  );
}
