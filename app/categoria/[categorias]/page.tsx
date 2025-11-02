import { notFound } from "next/navigation";
import CardProduct from "../../components/CardProduct";

// Ejemplo de datos de productos
const productos = [
  { nombre: "Batidos" },
  { nombre: "Galletas" },
  { nombre: "Donuts" },
  // ...agrega más productos aquí
];

export default function CategoriaPage({ params }: { params: { categorias: string } }) {
  const producto = productos.find(p => p.nombre === params.categorias);
  if (!producto) return notFound();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-4 pt-6 pb-10 font-sans">
      <h2 className="text-2xl font-bold mb-6 text-center">{producto.nombre}</h2>
      <div className="max-w-md w-full">
      </div>
    </div>
  );
}
