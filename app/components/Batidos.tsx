import CardProduct from "./CardProduct";
const categorias = [
  { titulo: "Batido palta" },
  { titulo: "Batido fresa" },
  { titulo: "Batido chocolate" },
  { titulo: "Batido vainilla" },
  { titulo: "Batido mango" },
  { titulo: "Batido banana" }
];

export default function Batidos({ max }: { max?: number }) {
  const mostrar = max ? categorias.slice(0, max) : categorias;
  return (
    <div className="w-full max-w-4xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Batidos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {mostrar.map((cat, idx) => {
          // Generar nombre para la URL
          const nombre = cat.titulo.toLowerCase().replace(/ /g, "-");
          return (
            <CardProduct key={idx} titulo={cat.titulo} direccion={`/productos/${nombre}`} accion="Ver más" imagen={`/imagenes/Imagenes_Batidos/${nombre}.jpg`} />
          );
        })}
      </div>
    </div>
  );
}
