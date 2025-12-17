"use client";
import { useEffect, useState } from "react"; // 1. Agregamos useState
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  ListGroup,
} from "react-bootstrap";
import { useAuth } from "../components/AuthContext";
import { useCarrito } from "../components/CarritoContext";
import { useRouter } from "next/navigation";
import { indicadorEconomico } from "../api/api";

export default function CheckoutPage() {
  const { user, isAuthenticated } = useAuth();
  const { items, clearCart } = useCarrito();
  const router = useRouter();

  // ESTADOS PARA EL DÓLAR
  const [valorDolar, setValorDolar] = useState<number | null>(null);
  const [loadingDolar, setLoadingDolar] = useState(true);

  // Cargar el valor del dólar al entrar a la página
  useEffect(() => {
    const obtenerDolar = async () => {
      try {
        const data = await indicadorEconomico();
        setValorDolar(data.dolar.valor);
      } catch (error) {
        console.error("Error cargando el dólar", error);
      } finally {
        setLoadingDolar(false);
      }
    };
    obtenerDolar();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) router.push("/inicio-sesion");
  }, [isAuthenticated, router]);

  const total = items.reduce(
    (acc, item) =>
      acc + Number(item.precio.replace(/[^\d]/g, "")) * item.cantidad,
    0
  );

  // Cálculo del total en USD
  const totalUSD = valorDolar
    ? (total / valorDolar).toFixed(2)
    : "Calculando...";

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    // ... (Mantén tu lógica de handlePayment que ya teníamos para guardar en sessionStorage)
    // Asegúrate de usar 'valorDolar' y 'totalUSD' que ya tenemos aquí arriba.
  };

  if (!user)
    return <Container className="text-center py-5">Cargando...</Container>;

  return (
    <Container className="py-5">
      <h1 className="mb-4">Checkout</h1>
      <Row>
        {/* Columna Formulario (Izquierda) */}
        <Col md={7}>{/* ... (Tu código de formulario actual) ... */}</Col>

        {/* Columna Resumen (Derecha) */}
        <Col md={5}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h4 className="text-primary mb-3">Tu Carrito</h4>
              <ListGroup variant="flush">
                {items.map((item, index) => (
                  <ListGroup.Item
                    key={index}
                    className="d-flex justify-content-between lh-sm"
                  >
                    <div>
                      <h6 className="my-0">{item.titulo}</h6>
                      <small className="text-muted">
                        Cant: {item.cantidad}
                      </small>
                    </div>
                    <span className="text-muted">
                      $
                      {(
                        Number(item.precio.replace(/[^\d]/g, "")) *
                        item.cantidad
                      ).toLocaleString()}
                    </span>
                  </ListGroup.Item>
                ))}

                {/* --- SECCIÓN DE TOTALES --- */}
                <ListGroup.Item className="d-flex justify-content-between bg-light">
                  <span>Total (CLP)</span>
                  <strong>${total.toLocaleString("es-CL")}</strong>
                </ListGroup.Item>

                {/* VISUALIZACIÓN DEBAJO DEL TOTAL (Lo que pediste) */}
                <ListGroup.Item className="d-flex justify-content-between align-items-center border-top-0 pt-0 bg-light">
                  <small className="text-muted italic">
                    Equivalente en USD:
                  </small>
                  <strong className="text-primary">
                    {loadingDolar ? "Cargando..." : `U$D ${totalUSD}`}
                  </strong>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
