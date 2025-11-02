import { notFound } from "next/navigation";
import CardProduct from "../../components/CardProduct";

// Ejemplo de datos de productos
const productos = [
  { nombre: "batidos-palta", titulo: "Batido de Palta", descripcion: "Delicioso batido de palta.", imagen: "", precio: "$2.000" },
  { nombre: "galleta-palta", titulo: "Galleta de Palta", descripcion: "Galleta saludable de palta.", imagen: "", precio: "$1.000" },
  { nombre: "donut-palta", titulo: "Donut de Palta", descripcion: "Donut con sabor a palta.", imagen: "", precio: "$1.500" },
  // ...agrega más productos aquí
];

export default function ProductoPage({ params }: { params: { producto: string } }) {
  const producto = productos.find(p => p.nombre === params.producto);
  if (!producto) return notFound();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-4 pt-6 pb-10 font-sans">
      <h2 className="text-2xl font-bold mb-6 text-center">{producto.titulo}</h2>
      <div className="max-w-md w-full">
        <CardProduct
          titulo={producto.titulo}
          texto={producto.descripcion}
          imagen={producto.imagen}
          direccion={undefined}
        />
        <div className="mt-4 text-lg font-semibold text-center">Precio: {producto.precio}</div>
      </div>
    </div>
  );
}
