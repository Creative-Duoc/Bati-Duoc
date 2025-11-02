"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";

export default function Productos() {
  const batidos = [
    {
      nombre: "Batipalta",
      descripcion:
        "Suave, cremoso y tropical con aguacate, kiwi, mango y naranja.",
      precio: 8000,
      imagen: "/images/Avocado smoothie.png",
      id: "avocado",
    },
    {
      nombre: "BatiBanana",
      descripcion:
        "Plátano, maní y leche, un clásico energético e irresistible.",
      precio: 7000,
      imagen: "/images/Banana smoothie with peanut butter.png",
      id: "banana-peanut",
    },
    {
      nombre: "BatiBerry",
      descripcion: "Colorido y lleno de sabor, con frutos rojos y naranja.",
      precio: 8000,
      imagen: "/images/Berry smoothie.png",
      id: "berry",
    },
  ];

  return (
    <main className="container my-5">
      <h2 className="fw-bold text-center mb-4">Nuestros Batidos</h2>
      <div className="row g-4">
        {batidos.map((b) => (
          <div key={b.id} className="col-md-3">
            <div className="card h-100">
              <img src={b.imagen} className="card-img-top" alt={b.nombre} />
              <div className="card-body text-center">
                <h5 className="text-primary mb-1">{b.nombre}</h5>
                <p className="small">{b.descripcion}</p>
                <p className="fw-bold mb-2">${b.precio}</p>
                <Link
                  href={`/productos/${b.id}`}
                  className="btn btn-outline-dark btn-sm"
                >
                  Comprar
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
