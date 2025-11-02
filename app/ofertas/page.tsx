"use client";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Ofertas() {
  return (
    <>
      {/* SECCIÓN PRINCIPAL */}
      <section className="py-5 bg-light">
        <div className="container text-center">
          <h2 className="fw-bold mb-3">¡Ofertas Exclusivas de Bati-Duoc!</h2>
          <p className="text-muted mb-5">
            Aprovecha nuestros descuentos por tiempo limitado en batidos
            naturales y saludables. 🌿
          </p>

          <div className="row g-4">
            {/* Batipalta en oferta */}
            <div className="col-md-4">
              <div className="card h-100 shadow-sm">
                <img
                  src="/imagenes/Imagenes_Batidos/Avocado smoothie.png"
                  alt="Batido de Palta"
                  className="img-fluid rounded shadow"
                />

                <div className="card-body text-center">
                  <h5 className="fw-bold">Batipalta</h5>
                  <p className="text-muted small">
                    Cremoso, fresco y tropical. Mezcla de aguacate, kiwi y
                    mango.
                  </p>
                  <div className="d-flex justify-content-center align-items-center gap-2 mb-2">
                    <span className="text-decoration-line-through text-secondary">
                      $8.000
                    </span>
                    <span className="fw-bold text-success">$6.400</span>
                  </div>
                  <a
                    href="/productoPag.html?id=avocado"
                    className="btn btn-outline-dark btn-sm"
                  >
                    Comprar ahora
                  </a>
                </div>
              </div>
            </div>

            {/* BatiBerry */}
            <div className="col-md-4">
              <div className="card h-100 shadow-sm">
                <img
                  src="/imagenes/Imagenes_Batidos/Berry smoothie.png"
                  className="card-img-top"
                  alt="BatiBerry"
                />
                <div className="card-body text-center">
                  <h5 className="fw-bold">BatiBerry</h5>
                  <p className="text-muted small">
                    Refrescante batido de frutos rojos con jugo natural de
                    naranja.
                  </p>
                  <div className="d-flex justify-content-center align-items-center gap-2 mb-2">
                    <span className="text-decoration-line-through text-secondary">
                      $8.000
                    </span>
                    <span className="fw-bold text-success">$6.800</span>
                  </div>
                  <a
                    href="/productoPag.html?id=berry"
                    className="btn btn-outline-dark btn-sm"
                  >
                    Comprar ahora
                  </a>
                </div>
              </div>
            </div>

            {/* BatiProteína */}
            <div className="col-md-4">
              <div className="card h-100 shadow-sm">
                <img
                  src="/imagenes/Imagenes_Batidos/Protein smoothie.png"
                  className="card-img-top"
                  alt="BatiProteína"
                />
                <div className="card-body text-center">
                  <h5 className="fw-bold">BatiProteína</h5>
                  <p className="text-muted small">
                    Batido energético con proteína natural, plátano y avena.
                  </p>
                  <div className="d-flex justify-content-center align-items-center gap-2 mb-2">
                    <span className="text-decoration-line-through text-secondary">
                      $10.000
                    </span>
                    <span className="fw-bold text-success">$8.500</span>
                  </div>
                  <a
                    href="/productoPag.html?id=protein"
                    className="btn btn-outline-dark btn-sm"
                  >
                    Comprar ahora
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Mensaje final */}
          <div className="mt-5">
            <h5 className="fw-bold">🎁 Promoción especial:</h5>
            <p className="text-muted">
              Llévate un 10% adicional si compras más de 3 batidos en una sola
              orden.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
