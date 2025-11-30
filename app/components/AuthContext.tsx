"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

// 1. Definimos la estructura del usuario y del contexto
// Esta interfaz 'User' debe coincidir con las columnas de tu tabla en la Base de Datos MySQL.
// Cuando el backend responde, nos envía un JSON con estos campos.
export interface User {
  id?: number;       // ID autogenerado por la BD (Primary Key).
  email: string;     // Columna 'email' en la tabla usuarios.
  nombre: string;    // Columna 'nombre' en la tabla usuarios.
  apellido: string;  // Columna 'apellido' en la tabla usuarios.
  region: string;    // Columna 'region' en la tabla usuarios.
  comuna: string;    // Columna 'comuna' en la tabla usuarios.
  telefono?: string; // Columna 'telefono' en la tabla usuarios (opcional).
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

// 2. Creamos el contexto con un valor inicial undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 3. Hook personalizado para usar el contexto fácilmente
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
}

// 4. Creamos el componente Provider que envolverá nuestra app
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  // Efecto para cargar el usuario desde localStorage al iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Función de login
  // Recibe 'userData' que es el objeto que vino DIRECTAMENTE de la Base de Datos (vía backend).
  const login = (userData: User) => {
    // Guardamos esos datos de la BD en el navegador (localStorage) para no perder la sesión al recargar.
    localStorage.setItem("user", JSON.stringify(userData));
    // Actualizamos el estado de React para que toda la app sepa que hay un usuario conectado.
    setUser(userData);
    router.push("/"); // Redirige al home después de iniciar sesión
  };

  // Función de logout
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/inicio-sesion"); // Redirige al login después de cerrar sesión
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user, // !!user convierte el objeto user a un booleano (true si existe, false si es null)
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
