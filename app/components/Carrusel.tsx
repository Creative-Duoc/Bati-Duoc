"use client";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";

function UncontrolledExample() {
  return (
    <Carousel fade interval={4000} pause="hover">
      {/* Slide 1 */}
      <Carousel.Item>
        <img
          src="/imagenes/Imagenes_Batidos/batidos.jpg"
          alt="Batidos naturales"
          className="d-block w-100 carousel-img"
        />
        <Carousel.Caption>
          <h3 className="fw-bold text-shadow">Batidos Naturales</h3>
          <p className="text-shadow">
            Frescos, saludables y llenos de energía.
          </p>
        </Carousel.Caption>
      </Carousel.Item>

      {/* Slide 2 */}
      <Carousel.Item>
        <img
          src="/imagenes/Imagenes_Batidos/galleta-chocolate.jpg"
          alt="Galletas artesanales"
          className="d-block w-100 carousel-img"
        />
        <Carousel.Caption>
          <h3 className="fw-bold text-shadow">Galleta</h3>
          <p className="text-shadow">
            Dulces, suaves y con un toque casero irresistible..
          </p>
        </Carousel.Caption>
      </Carousel.Item>

      {/* Slide 3 */}
      <Carousel.Item>
        <img
          src="/imagenes/imagenes_Donas/dona-banana.jpg"
          alt="Donuts Banana"
          className="d-block w-100 carousel-img"
        />
        <Carousel.Caption>
          <h3 className="fw-bold text-shadow">Donuts Irresistibles</h3>
          <p className="text-shadow">
            Dulzura, suavidad y sabor en cada bocado.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default UncontrolledExample;
