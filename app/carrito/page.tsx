"use client";
import React from "react";
import { useCarrito } from "../components/CarritoContext";
import Link from "next/link";

export default function CarritoPage() {
  const { items, removeFromCart, updateQuantity, clearCart } = useCarrito();
  const total = items.reduce((acc, item) => acc + Number(item.precio.replace(/[^\d]/g, "")) * item.cantidad, 0);

  return (
    <div className="container py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Carrito de Compras</h2>
      {items.length === 0 ? (
        <div className="text-center text-gray-500">El carrito está vacío.</div>
      ) : (
        <div className="row">
          <div className="col-md-8">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Imagen</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr key={item.nombre}>
                    <td><img src={item.imagen} alt={item.titulo} style={{ width: 60, height: 40, objectFit: "cover" }} /></td>
                    <td>{item.titulo}</td>
                    <td>{item.precio}</td>
                    <td>
                      <input
                        type="number"
                        min={1}
                        value={item.cantidad}
                        onChange={e => updateQuantity(item.nombre, Number(e.target.value))}
                        style={{ width: 60 }}
                      />
                    </td>
                    <td>${(Number(item.precio.replace(/[^\d]/g, "")) * item.cantidad).toLocaleString()}</td>
                    <td>
                      <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item.nombre)}>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="col-md-4">
            <div className="card p-4">
              <h4 className="mb-3">Resumen</h4>
              <div className="mb-2">Total: <span className="fw-bold">${total.toLocaleString()}</span></div>
              <button className="btn btn-secondary w-100 mb-2" onClick={clearCart}>Limpiar</button>
              <Link href="/checkout" passHref>
                <button className="btn btn-success w-100">Comprar ahora</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
