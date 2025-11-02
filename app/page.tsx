

const categorias = [
  { titulo: "Batidos" },
  { titulo: "Galletas" },
  { titulo: "Donuts" }
];
import Carrusel from "./components/Carrusel";
import CardProduct from "./components/CardProduct";

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-4 pt-6 pb-10 font-sans">
      <Carrusel />
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
