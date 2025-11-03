"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import * as firebaseApp from "firebase/app";
import * as firebaseAuth from "firebase/auth";
import * as firebaseFirestore from "firebase/firestore";
// --- CONFIGURACIÓN GLOBAL ---
// Variables globales proporcionadas por el entorno.
declare const __app_id: string;
declare const __firebase_config: string;
declare const __initial_auth_token: string | undefined;

// Inicializa las variables necesarias
const appId = typeof __app_id !== "undefined" ? __app_id : "default-app-id";
const firebaseConfig = JSON.parse(
  typeof __firebase_config !== "undefined" ? __firebase_config : "{}"
);

// Inicialización de Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Tipo para el Contexto de Autenticación
interface AuthContextType {
  currentUser: User | null;
  userId: string | null;
  isAuthenticated: boolean;
  isAuthReady: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (
    email: string,
    password: string,
    name: string,
    phone: string,
    region: string,
    comuna: string
  ) => Promise<void>;
  logout: () => Promise<void>;
}

// Inicialización del Contexto con valores nulos
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook personalizado para usar el contexto fácilmente
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    // Este error ocurre si useAuth() se llama fuera de AuthContextProvider
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
};

// Componente Proveedor del Contexto
export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  // El userId se calcula después de que la autenticación está lista
  const userId = currentUser?.uid || null;
  const isAuthenticated = !!currentUser && !currentUser.isAnonymous;

  // 1. Efecto para manejar la autenticación inicial y el cambio de estado
  useEffect(() => {
    let isMounted = true;

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (isMounted) {
        // Almacena el usuario actual o null si no hay sesión
        setCurrentUser(user);
        setIsAuthReady(true);
      }
    });

    const initialAuth = async () => {
      try {
        if (
          typeof __initial_auth_token !== "undefined" &&
          __initial_auth_token
        ) {
          await signInWithCustomToken(auth, __initial_auth_token);
        } else if (!auth.currentUser) {
          // Si no hay token y no hay usuario, iniciamos anónimamente
          await signInAnonymously(auth);
        }
      } catch (error) {
        console.error("Error during initial authentication:", error);
      }
    };

    if (auth.currentUser === null) {
      initialAuth();
    } else {
      setIsAuthReady(true);
    }

    // Función de limpieza para evitar fugas de memoria
    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  // 2. Función de Inicio de Sesión
  const login = async (email: string, password: string) => {
    // Implementación con manejo de errores básico
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      throw error; // Propaga el error para que la interfaz lo muestre
    }
  };

  // 3. Función de Registro
  const signup = async (
    email: string,
    password: string,
    name: string,
    phone: string,
    region: string,
    comuna: string
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Guardar datos adicionales en Firestore
      const userDocRef = doc(
        db,
        `artifacts/${appId}/users/${user.uid}/profile`,
        "data"
      );

      await setDoc(userDocRef, {
        uid: user.uid,
        email: email,
        name: name,
        phone: phone,
        region: region,
        comuna: comuna,
        createdAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
      throw error; // Propaga el error para que la interfaz lo muestre
    }
  };

  // 4. Función de Cierre de Sesión
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      throw error;
    }
  };

  // Objeto de valor del contexto
  const value = {
    currentUser,
    userId,
    isAuthenticated,
    isAuthReady,
    login,
    signup,
    logout,
  };

  // Renderiza los componentes hijos solo cuando el estado de autenticación inicial está listo
  return (
    <AuthContext.Provider value={value}>
      {isAuthReady ? (
        children
      ) : (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "100vh" }}
        >
          {/* Indicador visual de carga */}
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
};
