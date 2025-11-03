"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

// 1. Definimos la estructura del usuario y del contexto
interface User {
  email: string;
  nombre: string;
  apellido: string;
  region: string;
  comuna: string;
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
  const login = (userData: User) => {
    localStorage.setItem("user", JSON.stringify(userData));
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
