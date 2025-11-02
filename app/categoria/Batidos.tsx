import CardProduct from "../components/CardProduct";
const categorias = [
  { titulo: "Batidos palta" },
  { titulo: "Batidos fresa" },
  { titulo: "Batidos chocolate" }
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
            <CardProduct key={idx} titulo={cat.titulo} direccion={`/productos/${nombre}`} />
          );
        })}
      </div>
    </div>
  );
}
