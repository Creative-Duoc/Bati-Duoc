import { notFound } from "next/navigation";
import ProductDetail from "../../components/ProductDetail";

import { batidos } from "../../data/batidos";
import { galletas } from "../../data/galletas";
import { donuts } from "../../data/donuts";

const productos = [...batidos, ...galletas, ...donuts];

// Se ha simplificado la definición de tipos directamente en los argumentos de la función.
export default function ProductoPage({ params }: { params: { producto: string } }) {
  const producto = productos.find(p => p.nombre === params.producto);
  if (!producto) return notFound();

  // Productos con oferta especial
  const productosOferta = ["batido-palta", "galleta-vainilla", "donut-chocolate"];
  const mostrarOferta = productosOferta.includes(producto.nombre);
  // Generar precio anterior fijo (20% más caro)
  let precioAnterior = "";
  if (mostrarOferta) {
    const precioNum = Number(producto.precio.replace(/[^\d]/g, ""));
    const aumento = Math.floor(precioNum * 1.2);
    precioAnterior = `$${aumento.toLocaleString()}`;
  }
  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-4 pt-6 pb-10 font-sans">
      <ProductDetail
        titulo={producto.titulo}
        descripcion={producto.descripcion}
        precio={producto.precio}
        imagen={producto.imagen}
        precioAnterior={mostrarOferta ? precioAnterior : undefined}
      />
    </div>
  );
}
