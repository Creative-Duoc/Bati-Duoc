import CardProduct from "../components/CardProduct";

const categorias = [
  {
    titulo: "Donuts palta",
    imagen: "/imagenes/imagenes_Donas/dona-de-aguacate.jpg",
  },
  {
    titulo: "Donuts fresa",
    imagen: "/imagenes/imagenes_Donas/dona-fresa.jpeg",
  },
  {
    titulo: "Donuts chocolate",
    imagen: "/imagenes/imagenes_Donas/dona-chocolate.jpg",
  },
  {
    titulo: "Donuts vainilla",
    imagen: "/imagenes/imagenes_Donas/dona-vainilla.jpeg",
  },
  {
    titulo: "Donuts mango",
    imagen: "/imagenes/imagenes_Donas/dona-mango.jpg",
  },
  {
    titulo: "Donuts banana",
    imagen: "/imagenes/imagenes_Donas/dona-banana.jpg",
  },
];

export default function Donuts({ max }: { max?: number }) {
  const mostrar = max ? categorias.slice(0, max) : categorias;

  return (
    <div className="w-full max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-warning">
        🍩 Donuts Bati-Duoc
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {mostrar.map((cat, idx) => {
          const nombre = cat.titulo.toLowerCase().replace(/ /g, "-");
          return (
            <CardProduct
              key={idx}
              titulo={cat.titulo}
              direccion={`/productos/${nombre}`}
              imagen={cat.imagen}
            />
          );
        })}
      </div>
    </div>
  );
}
