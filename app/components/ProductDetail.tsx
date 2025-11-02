import React from "react";

interface ProductDetailProps {
  titulo: string;
  descripcion: string;
  precio: string;
  imagen: string;
  precioAnterior?: string;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ titulo, descripcion, precio, imagen, precioAnterior }) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2 flex justify-center items-center">
          <img
            src={imagen}
            alt={titulo}
            className="w-full max-w-md h-auto object-cover rounded border border-gray-300"
          />
        </div>
        <div className="md:w-1/2 flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-2">{titulo}</h1>
          {precioAnterior ? (
            <div className="text-lg text-gray-500 mb-1">
              <span className="line-through mr-2">{precioAnterior}</span>
              <span className="text-2xl font-bold text-green-700">{precio}</span>
            </div>
          ) : (
            <div className="text-2xl font-bold text-green-700 mb-2">{precio}</div>
          )}
          <hr className="mb-4" />
          <p className="text-lg text-gray-700 mb-6">{descripcion}</p>
          <div className="mb-6">
            <label htmlFor="cantidad" className="block text-md font-medium mb-2">Cantidad</label>
            <select id="cantidad" className="border rounded px-3 py-2 w-24">
              {[1,2,3,4,5].map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded transition text-lg">Añadir al carrito</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
