"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductDetail from "../components/ProductDetail";
import { batidos } from "../data/batidos";
import { galletas } from "../data/galletas";
import { donuts } from "../data/donuts";

const productosOfertaNombres = ["batido-palta", "galleta-vainilla", "donut-chocolate"];
const productosTodos = [...batidos, ...galletas, ...donuts];
const productosOferta = productosTodos.filter(p => productosOfertaNombres.includes(p.nombre)).map(producto => {
  // Generar precio anterior fijo (20% más caro)
  const precioNum = Number(producto.precio.replace(/[^\d]/g, ""));
  const aumento = Math.floor(precioNum * 1.2);
  const precioAnterior = `$${aumento.toLocaleString()}`;
  return {
    ...producto,
    precioAnterior
  };
});

export default function Ofertas() {
  return (
    <div className="min-h-screen bg-white py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-red-600">Ofertas Especiales</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {productosOferta.map(producto => (
          <ProductDetail
            key={producto.nombre}
            titulo={producto.titulo}
            descripcion={producto.descripcion}
            precio={producto.precio}
            imagen={producto.imagen}
            precioAnterior={producto.precioAnterior}
          />
        ))}
      </div>
    </div>
  );
}
