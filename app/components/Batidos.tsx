import CardProduct from "./CardProduct";
import { batidos } from "../data/batidos";

export default function Batidos({ max }: { max?: number }) {
  const mostrar = max ? batidos.slice(0, max) : batidos;
  return (
    <div className="w-full max-w-4xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Batidos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {mostrar.map((batido) => (
          <CardProduct
            key={batido.nombre}
            titulo={batido.titulo}
            direccion={`/productos/${batido.nombre}`}
            accion="Ver más"
            precio={batido.precio}
            imagen={batido.imagen}
          />
        ))}
      </div>
    </div>
  );
}
