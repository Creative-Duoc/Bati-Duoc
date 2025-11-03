"use client";
import React from "react";
import { notFound } from "next/navigation";

import Batidos from "../../components/Batidos";
import Galletas from "../../components/Galletas";
import Donuts from "../../components/Donuts";

// Mapa de componentes
const componentes: Record<string, React.FC<{ max?: number }>> = {
  batidos: Batidos,
  galletas: Galletas,
  donuts: Donuts,
};

export default function CategoriaPage({ params }: { params: Promise<{ categorias: string }> }) {
  const { categorias } = React.use(params);
  const nombre = categorias.toLowerCase();
  const Componente = componentes[nombre];

  if (!Componente) return notFound();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-4 pt-6 pb-10 font-sans">
      <div className="mb-10">
        <Componente max={6} />
      </div>
    </div>
  );
}
