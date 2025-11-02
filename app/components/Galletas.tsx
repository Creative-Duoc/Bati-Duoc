import CardProduct from "./CardProduct";
import { galletas } from "../data/galletas";

export default function Galletas({ max }: { max?: number }) {
    const mostrar = max ? galletas.slice(0, max) : galletas;
    return (
        <div className="w-full max-w-4xl">
            <h2 className="text-2xl font-bold mb-6 text-center">Galletas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {mostrar.map((galleta) => (
                    <CardProduct
                        key={galleta.nombre}
                        titulo={galleta.titulo}
                        direccion={`/productos/${galleta.nombre}`}
                        accion="ver mas"
                        precio={galleta.precio}
                        imagen={galleta.imagen}
                    />
                ))}
            </div>
        </div>
    );
}
