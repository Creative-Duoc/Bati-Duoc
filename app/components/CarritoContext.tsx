"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface CartItem {
  nombre: string;
  titulo: string;
  precio: string;
  imagen: string;
  cantidad: number;
}

interface CarritoContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, "cantidad">) => void;
  removeFromCart: (nombre: string) => void;
  updateQuantity: (nombre: string, cantidad: number) => void;
  clearCart: () => void;
  total: number;
}

const CarritoContext = createContext<CarritoContextType | undefined>(undefined);

export function useCarrito() {
  const context = useContext(CarritoContext);
  if (!context) throw new Error("useCarrito debe usarse dentro de CarritoProvider");
  return context;
}

export function CarritoProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Cargar carrito desde localStorage al montar
  useEffect(() => {
    const data = localStorage.getItem("carrito");
    if (data) {
      try {
        setItems(JSON.parse(data));
      } catch {}
    }
  }, []);

  // Guardar carrito en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(items));
  }, [items]);

  function addToCart(item: Omit<CartItem, "cantidad">) {
    setItems(prev => {
      const found = prev.find(p => p.nombre === item.nombre);
      if (found) {
        return prev.map(p =>
          p.nombre === item.nombre ? { ...p, cantidad: p.cantidad + 1 } : p
        );
      }
      return [...prev, { ...item, cantidad: 1 }];
    });
  }

  function removeFromCart(nombre: string) {
    setItems(prev => prev.filter(p => p.nombre !== nombre));
  }

  function updateQuantity(nombre: string, cantidad: number) {
    setItems(prev =>
      prev.map(p =>
        p.nombre === nombre ? { ...p, cantidad } : p
      )
    );
  }

  function clearCart() {
    setItems([]);
  }

  const total = items.reduce((sum, item) => {
    const price = Number(item.precio.replace(/[^\d]/g, ""));
    return sum + price * item.cantidad;
  }, 0);

  return (
    <CarritoContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, total }}>
      {children}
    </CarritoContext.Provider>
  );
}
