import CardProduct from "./CardProduct";
import { donuts } from "../data/donuts";

export default function Donuts({ max }: { max?: number }) {
    const mostrar = max ? donuts.slice(0, max) : donuts;
    return (
        <div className="w-full max-w-4xl">
            <h2 className="text-2xl font-bold mb-6 text-center">Donuts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {mostrar.map((donut) => (
                    <CardProduct
                        key={donut.nombre}
                        titulo={donut.titulo}
                        direccion={`/productos/${donut.nombre}`}
                        accion="ver mas"
                        precio={donut.precio}
                        imagen={donut.imagen}
                    />
                ))}
            </div>
        </div>
    );
}