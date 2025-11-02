import CardProduct from "./CardProduct";
const categorias = [
    { titulo: "Galleta palta" },
    { titulo: "Galleta fresa" },
    { titulo: "Galleta chocolate" },
    { titulo: "Galleta vainilla" },
    { titulo: "Galleta mango" },
    { titulo: "Galleta banana" }
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
                        <CardProduct key={idx} titulo={cat.titulo} direccion={`/productos/${nombre}`} accion="ver mas" imagen={`/imagenes/Imagenes_Batidos/${nombre}.jpg`} />
                    );
                })}
            </div>
        </div>
    );
}
