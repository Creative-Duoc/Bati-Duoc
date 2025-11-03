"use client";
import Carrusel from "./components/Carrusel";
import CardProduct from "./components/CardProduct";

const categorias = [
  {
    titulo: "Batidos",
    descripcion: "Frescos, naturales y llenos de energía.",
    imagen: "/imagenes/Imagenes_Categorias/Batidos.jpg",
  },
  {
    titulo: "Galletas",
    descripcion: "Dulces artesanales con ingredientes saludables.",
    imagen: "/imagenes/Imagenes_Categorias/Galletas.jpg",
  },
  {
    titulo: "Donuts",
    descripcion: "Suaves, coloridas y con el toque Bati-Duoc.",
    imagen: "/imagenes/Imagenes_Categorias/Donuts.jpg",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-100 flex flex-col items-center px-4 py-10 font-sans">
      {/* Carrusel principal */}
      <section className="w-full max-w-6xl mb-12 shadow-lg rounded-xl overflow-hidden">
        <Carrusel />
      </section>

      {/* Sección de categorías */}
      <section className="w-full max-w-6xl text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-gray-800 tracking-tight">
          Explora nuestras categorías
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categorias.map((cat, idx) => {
            const nombre = cat.titulo.toLowerCase().replace(/ /g, "-");
            return (
              <CardProduct
                key={idx}
                titulo={cat.titulo}
                descripcion={cat.descripcion}
                direccion={`/categoria/${nombre}`}
                imagen={cat.imagen}
                accion="Explorar"
              />
            );
          })}
        </div>
      </section>

      {/* Llamado a la acción */}
      <section className="mt-16 text-center bg-white shadow-md rounded-lg p-8 max-w-4xl">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          ¡Vive la experiencia saludable con Bati-Duoc!
        </h3>
        <p className="text-gray-600 mb-6">
          Productos naturales, deliciosos y elaborados con pasión. ¡Disfruta
          bienestar en cada sorbo y mordida!
        </p>
        <a
          href="/nosotros"
          className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 shadow-md"
        >
          Conócenos
        </a>
      </section>
    </main>
  );
}
