"use client";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Nosotros() {
  return (
    <>
      {/* SECCIÓN QUIÉNES SOMOS */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="fw-bold text-center mb-4">Nuestra Historia</h2>
          <div className="row align-items-center">
            <div className="col-md-6">
              <p>
                <strong>Bati-Duoc</strong> nació en el año 2024 como un proyecto
                universitario que buscaba promover hábitos de vida saludables a
                través de productos naturales, frescos y nutritivos. Lo que
                empezó como una idea en una sala de clases, pronto se convirtió
                en una marca comprometida con ofrecer alternativas innovadoras,
                deliciosas y accesibles para todos.
              </p>
              <p>
                Nuestra pasión por la nutrición y el bienestar nos llevó a
                experimentar con frutas, verduras y superalimentos hasta
                encontrar combinaciones únicas que no solo deleitan el paladar,
                sino que también aportan energía y salud.
              </p>
            </div>
            <div className="col-md-6 text-center">
              <img
                src="/imagenes/imagenes_experiencias/nuestrahistoria.png"
                className="img-fluid rounded shadow"
                alt="Equipo Bati-Duoc"
              />
            </div>
          </div>
        </div>
      </section>

      {/* MISIÓN Y VISIÓN */}
      <section className="py-5">
        <div className="container">
          <div className="row text-center">
            <div className="col-md-6 mb-4">
              <h3 className="fw-bold">Misión</h3>
              <p>
                Inspirar a las personas a llevar un estilo de vida más saludable
                mediante batidos naturales que combinan sabor, frescura y
                nutrición, contribuyendo al bienestar físico y emocional de
                nuestra comunidad.
              </p>
            </div>
            <div className="col-md-6 mb-4">
              <h3 className="fw-bold">Visión</h3>
              <p>
                Ser reconocidos como la marca líder de batidos saludables en
                Chile, expandiendo nuestra propuesta innovadora a nivel nacional
                e internacional, siempre con un compromiso sostenible y
                responsable con el medio ambiente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VALORES */}
      <section className="py-5 bg-light">
        <div className="container text-center">
          <h3 className="fw-bold mb-4">Nuestros Valores</h3>
          <div className="row">
            <div className="col-md-4">
              <h5 className="fw-bold">Innovación</h5>
              <p>
                Exploramos nuevas combinaciones de sabores y productos para
                sorprender a nuestros clientes.
              </p>
            </div>
            <div className="col-md-4">
              <h5 className="fw-bold">Salud</h5>
              <p>
                Promovemos un consumo consciente con ingredientes frescos y
                naturales.
              </p>
            </div>
            <div className="col-md-4">
              <h5 className="fw-bold">Sostenibilidad</h5>
              <p>
                Trabajamos con prácticas responsables que respetan al medio
                ambiente.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
