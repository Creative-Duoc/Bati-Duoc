import { notFound } from "next/navigation";
import ProductDetail from "../../components/ProductDetail";

// Ejemplo de datos de productos
const productos = [
  { nombre: "batido-palta", titulo: "Batido de Palta", descripcion: "Delicioso batido de palta.", precio: "$2.000" },
  { nombre: "galleta-palta", titulo: "Galleta de Palta", descripcion: "Galleta saludable de palta.", precio: "$1.000" },
  { nombre: "donut-palta", titulo: "Donut de Palta", descripcion: "Donut con sabor a palta.", precio: "$1.500" },
  { nombre: "batido-fresa", titulo: "Batido de Fresa", descripcion: "Delicioso batido de fresa.", precio: "$2.000" },
  { nombre: "galleta-fresa", titulo: "Galleta de Fresa", descripcion: "Galleta saludable de fresa.", precio: "$1.000" },
  { nombre: "donut-fresa", titulo: "Donut de Fresa", descripcion: "Donut con sabor a fresa.", precio: "$1.500" },
  { nombre: "batido-mango", titulo: "Batido de Mango", descripcion: "Delicioso batido de mango.", precio: "$2.000" },
  { nombre: "galleta-mango", titulo: "Galleta de Mango", descripcion: "Galleta saludable de mango.", precio: "$1.000" },
  { nombre: "donut-mango", titulo: "Donut de Mango", descripcion: "Donut con sabor a mango.", precio: "$1.500" },
  { nombre: "batido-chocolate", titulo: "Batido de Chocolate", descripcion: "Delicioso batido de chocolate.", precio: "$2.000" },
  { nombre: "galleta-chocolate", titulo: "Galleta de Chocolate", descripcion: "Galleta saludable de chocolate.", precio: "$1.000" },
  { nombre: "donut-chocolate", titulo: "Donut de Chocolate", descripcion: "Donut con sabor a chocolate.", precio: "$1.500" },
  { nombre: "batido-banana", titulo: "Batido de Banana", descripcion: "Delicioso batido de banana.", precio: "$2.000" },
  { nombre: "galleta-banana", titulo: "Galleta de Banana", descripcion: "Galleta saludable de banana.", precio: "$1.000" },
  { nombre: "donut-banana", titulo: "Donut de Banana", descripcion: "Donut con sabor a banana.", precio: "$1.500" },
  { nombre: "batido-vainilla", titulo: "Batido de Vainilla", descripcion: "Delicioso batido de vainilla.", precio: "$2.000" },
  { nombre: "galleta-vainilla", titulo: "Galleta de Vainilla", descripcion: "Galleta saludable de vainilla.", precio: "$1.000" },
  { nombre: "donut-vainilla", titulo: "Donut de Vainilla", descripcion: "Donut con sabor a vainilla.", precio: "$1.500" }
  // ...agrega más productos aquí
];

export default function ProductoPage({ params }: { params: { producto: string } }) {
  const producto = productos.find(p => p.nombre === params.producto);
  if (!producto) return notFound();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-4 pt-6 pb-10 font-sans">
      <ProductDetail
        titulo={producto.titulo}
        descripcion={producto.descripcion}
        precio={producto.precio}
        imagen={`/imagenes/Imagenes_Batidos/${producto.nombre}.jpg`}
      />
    </div>
  );
}
