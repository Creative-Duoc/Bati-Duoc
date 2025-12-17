"use client"; // Componente de cliente (usa hooks)

import { useEffect, useState } from "react";
import { indicadorEconomico } from "./../api/api";

// Componente que muestra el indicador DÓLAR
export default function IndicadorDolar() {
  // Interface que representa un indicador económico
  interface Indicador {
    codigo: string;
    nombre: string;
    unidad_medida: string;
    fecha: string;
    valor: number;
  }

  // Interface de la respuesta de la API (parcial)
  interface IndicadorResponse {
    version: string;
    autor: string;
    fecha: string;
    dolar: Indicador;
  }

  // Estado para almacenar el dólar
  const [dolar, setDolar] = useState<Indicador | null>(null);
  const [loading, setLoading] = useState(true);

  // Se ejecuta al montar el componente
  useEffect(() => {
    const fetchDolar = async () => {
      try {
        const data: IndicadorResponse = await indicadorEconomico();
        console.log(data); // Debug
        setDolar(data.dolar);
      } catch (error) {
        console.error("Error obteniendo el dólar", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDolar();
  }, []);

  // Estado de carga
  if (loading) {
    return <p>Cargando indicador dólar...</p>;
  }

  // Si no hay datos
  if (!dolar) {
    return <p>No se pudo obtener el indicador dólar.</p>;
  }

  // Render
  return (
    <div className="border rounded p-4 max-w-sm">
      <h3 className="text-lg font-bold mb-2">Indicador Dólar</h3>

      <ul>
        <li>
          código: <strong>{dolar.codigo}</strong>
        </li>
        <li>
          nombre: <strong>{dolar.nombre}</strong>
        </li>
        <li>
          unidad de medida: <strong>{dolar.unidad_medida}</strong>
        </li>
        <li>
          fecha:{" "}
          <strong>{new Date(dolar.fecha).toLocaleDateString("es-CL")}</strong>
        </li>
        <li>
          valor: <strong>${dolar.valor.toLocaleString("es-CL")}</strong>
        </li>
      </ul>
    </div>
  );
}
