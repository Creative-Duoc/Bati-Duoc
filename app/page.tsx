

const categorias = [
  { titulo: "Batidos" },
  { titulo: "Galletas" },
  { titulo: "Donuts" }
];

import CardProduct from "./components/CardProduct";

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-4 pt-6 pb-10 font-sans">
      {/* Banner de lanzamientos */}
      <div className="w-full max-w-4xl h-48 bg-gray-200 rounded-lg flex flex-col items-center justify-center mb-8">
        <div className="text-4xl font-bold text-gray-400 mb-2">1200 x 300</div>
        <div className="text-lg text-gray-500">Nuevos Lanzamientos</div>
        <div className="text-sm text-gray-400">Descubre los últimos juegos disponibles en nuestra tienda.</div>
      </div>

      {/* Sección de categorías */}
      <div className="w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Categorías</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {categorias.map((cat, idx) => (
            <CardProduct key={idx} titulo={cat.titulo} />
          ))}
        </div>
      </div>
    </div>
  );
}
