const categorias = [
    { titulo: "Batidos" },
    { titulo: "Galletas" },
    { titulo: "Donuts" }
];
import CardProduct from "../components/CardProduct";
import Batidos from "./Batidos";
import Galletas from "./Galletas";
import Donuts from "./Donuts";

export default function Home() {
    return (
        <div className="min-h-screen bg-white flex flex-col items-center px-4 pt-6 pb-10 font-sans">
            {/* Sección de categorías */}
            <div className="w-full max-w-4xl">
                <h2 className="text-2xl font-bold mb-6 text-center">Categorías</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {categorias.map((cat, idx) => (
                        <CardProduct key={idx} titulo={cat.titulo} />
                    ))}
                </div>
            </div>
            {/* Solo mostrar las tarjetas principales de las categorías */}
            <div className="mt-10">
                <Batidos max={3} />
            </div>
            <div className="mt-10">
                <Galletas max={3} />
            </div>
            <div className="mt-10">
                <Donuts max={3} />
            </div>
        </div>
    );
}
