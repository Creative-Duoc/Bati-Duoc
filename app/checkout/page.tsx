"use client";
import { useEffect, useState } from "react";
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

  // 1. Cargar el valor del dólar al entrar
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

  // 2. Proteger la ruta
  useEffect(() => {
    if (!isAuthenticated) router.push("/inicio-sesion");
  }, [isAuthenticated, router]);

  // 3. Cálculos
  const total = items.reduce(
    (acc, item) =>
      acc + Number(item.precio.replace(/[^\d]/g, "")) * item.cantidad,
    0
  );
  const totalUSD = valorDolar ? (total / valorDolar).toFixed(2) : "0.00";

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const isSuccess = Math.random() > 0.5;

      // Guardamos la información completa para las páginas de éxito/error
      const orderDataSession = {
        user: user,
        items: items,
        total: total,
        totalUSD: totalUSD,
        tasaDolar: valorDolar,
        orderId: Math.floor(Math.random() * 9000).toString(),
      };
      sessionStorage.setItem("lastOrder", JSON.stringify(orderDataSession));

      if (isSuccess) {
        // ENVÍO AL BACKEND JAVA (Tu lógica original)
        const orderDataBackend = {
          idUsuario: user!.id,
          direccionEnvio: `${user!.region}, ${user!.comuna}, ${
            (document.getElementById("formCalle") as HTMLInputElement).value
          }`,
          total: total,
          detalles: items.map((item) => ({
            nombreProducto: item.titulo,
            precio: Number(item.precio.replace(/[^\d]/g, "")),
            cantidad: item.cantidad,
          })),
        };

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/clients/orders`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderDataBackend),
          }
        );

        if (response.ok) {
          clearCart();
          router.push("/pago-exitoso");
        } else {
          router.push("/pago-fallido");
        }
      } else {
        router.push("/pago-fallido");
      }
    } catch (error) {
      router.push("/pago-fallido");
    }
  };

  if (!user)
    return (
      <Container className="text-center py-5">
        Cargando información...
      </Container>
    );

  return (
    <Container className="py-5">
      <h1 className="mb-4">Checkout</h1>
      <Row>
        {/* COLUMNA IZQUIERDA: FORMULARIO COMPLETO */}
        <Col md={7}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <Form onSubmit={handlePayment}>
                <h4 className="mb-3">Información del Cliente</h4>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre Completo</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={`${user.nombre} ${user.apellido}`}
                    readOnly
                    className="bg-light"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Correo Electrónico</Form.Label>
                  <Form.Control
                    type="email"
                    defaultValue={user.email}
                    readOnly
                    className="bg-light"
                  />
                </Form.Group>

                <hr className="my-4" />

                <h4 className="mb-3">Dirección de Entrega</h4>
                <Form.Group className="mb-3">
                  <Form.Label>Región</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={user.region}
                    readOnly
                    className="bg-light"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Comuna</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={user.comuna}
                    readOnly
                    className="bg-light"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formCalle">
                  <Form.Label>Calle y Número</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ej: Av. Siempre Viva 123"
                    required
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 mt-4 py-3 fw-bold"
                  size="lg"
                >
                  Pagar ahora ${total.toLocaleString("es-CL")}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* COLUMNA DERECHA: RESUMEN CON DÓLAR (Lo que pediste) */}
        <Col md={5}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-primary">Tu Carrito</span>
                <span className="badge bg-primary rounded-pill">
                  {items.length}
                </span>
              </h4>
              <ListGroup variant="flush">
                {items.map((item, index) => (
                  <ListGroup.Item
                    key={index}
                    className="d-flex justify-content-between lh-sm"
                  >
                    <div>
                      <h6 className="my-0">{item.titulo}</h6>
                      <small className="text-muted">
                        Cantidad: {item.cantidad}
                      </small>
                    </div>
                    <span className="text-muted">
                      $
                      {(
                        Number(item.precio.replace(/[^\d]/g, "")) *
                        item.cantidad
                      ).toLocaleString("es-CL")}
                    </span>
                  </ListGroup.Item>
                ))}

                {/* FILA DE TOTAL CLP */}
                <ListGroup.Item className="d-flex justify-content-between align-items-center bg-light mt-2">
                  <span className="fw-bold">Total (CLP)</span>
                  <strong className="h5 mb-0">
                    ${total.toLocaleString("es-CL")}
                  </strong>
                </ListGroup.Item>

                {/* --- AQUÍ ESTÁ EL DÓLAR DEBAJO DEL TOTAL --- */}
                <ListGroup.Item className="d-flex justify-content-between align-items-center border-top-0 pt-1 bg-light">
                  <small className="text-muted">Equivalente aproximado:</small>
                  <span className="text-primary fw-bold">
                    {loadingDolar ? "Cargando..." : `USD ${totalUSD}`}
                  </span>
                </ListGroup.Item>
                {/* ------------------------------------------ */}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
