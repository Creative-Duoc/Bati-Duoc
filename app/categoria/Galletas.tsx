import CardProduct from "../components/CardProduct";
const categorias = [
  { titulo: "galleta palta" },
  { titulo: "galleta fresa" },
  { titulo: "galleta chocolate" }
];

export default function Galletas({ max }: { max?: number }) {
  const mostrar = max ? categorias.slice(0, max) : categorias;
  return (
    <div className="w-full max-w-4xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Galletas</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {mostrar.map((cat, idx) => {
          const nombre = cat.titulo.toLowerCase().replace(/ /g, "-");
          return (
            <CardProduct key={idx} titulo={cat.titulo} direccion={`/productos/${nombre}`} />
          );
        })}
      </div>
    </div>
  );
}
