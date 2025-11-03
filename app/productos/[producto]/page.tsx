import { notFound } from "next/navigation";
import ProductDetail from "../../components/ProductDetail";
import React from "react";
import { batidos } from "../../data/batidos";
import { galletas } from "../../data/galletas";
import { donuts } from "../../data/donuts";

const productos = [...batidos, ...galletas, ...donuts];

// Usa el tipo estándar de Next.js para props de páginas dinámicas
export default function ProductoPage({ params }: { params: Promise<{ producto: string }> }) {
  const { producto } = React.use(params);
  const prod = productos.find(p => p.nombre === producto);
  if (!prod) return notFound();

  // Productos con oferta especial
  const productosOferta = ["batido-palta", "galleta-vainilla", "donut-chocolate"];
  const mostrarOferta = productosOferta.includes(prod.nombre);
  // Generar precio anterior fijo (20% más caro)
  let precioAnterior = "";
  if (mostrarOferta) {
    const precioNum = Number(prod.precio.replace(/[^\d]/g, ""));
    const aumento = Math.floor(precioNum * 1.2);
    precioAnterior = `$${aumento.toLocaleString()}`;
  }
  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-4 pt-6 pb-10 font-sans">
      <ProductDetail
        titulo={prod.titulo}
        descripcion={prod.descripcion}
        precio={prod.precio}
        imagen={prod.imagen}
        precioAnterior={mostrarOferta ? precioAnterior : undefined}
      />
    </div>
  );
}
