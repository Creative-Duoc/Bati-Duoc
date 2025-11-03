"use client";
import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Button, ListGroup, Alert } from "react-bootstrap";
import { useAuth } from "../components/AuthContext";
import { useCarrito } from "../components/CarritoContext";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { user, isAuthenticated } = useAuth();
  const { items, clearCart } = useCarrito();
  const router = useRouter();

  // 1. Proteger la ruta
  useEffect(() => {
    // Si no está autenticado, no puede estar aquí
    if (!isAuthenticated) {
      router.push("/inicio-sesion");
    }
  }, [isAuthenticated, router]);

  // Calcular el total
  const total = items.reduce((acc, item) => acc + Number(item.precio.replace(/[^\d]/g, "")) * item.cantidad, 0);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    
    const orderData = {
      user,
      items,
      total,
      orderId: `BATI-${Date.now().toString().slice(-6)}`
    };

    sessionStorage.setItem('lastOrder', JSON.stringify(orderData));

    // Simular pago con probabilidad de fallo
    const isSuccess = Math.random() > 0.5; // 50% de éxito, 50% de fallo

    if (isSuccess) {
      // Limpiar el carrito después de un pago exitoso
      clearCart();
      // Redirigir a la página de pago exitoso
      router.push("/pago-exitoso");
    } else {
      // Redirigir a la página de pago fallido
      router.push("/pago-fallido");
    }
  };

  // Si los datos aún no se han cargado, muestra un loader
  if (!user) {
    return <Container className="text-center py-5">Cargando información...</Container>;
  }

  return (
    <Container className="py-5">
      <h1 className="mb-4">Checkout</h1>
      <Row>
        {/* Columna de Información del Cliente y Pago */}
        <Col md={7}>
          <Card className="shadow-sm">
            <Card.Body>
              <Form onSubmit={handlePayment}>
                <h4 className="mb-3">Información del Cliente</h4>
                <Form.Group className="mb-3" controlId="formNombre">
                  <Form.Label>Nombre Completo</Form.Label>
                  <Form.Control type="text" defaultValue={`${user.nombre} ${user.apellido}`} readOnly />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Correo Electrónico</Form.Label>
                  <Form.Control type="email" defaultValue={user.email} readOnly />
                </Form.Group>

                <hr className="my-4" />

                <h4 className="mb-3">Dirección de Entrega</h4>
                <Form.Group className="mb-3" controlId="formRegion">
                  <Form.Label>Región</Form.Label>
                  <Form.Control type="text" defaultValue={user.region} readOnly />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formComuna">
                  <Form.Label>Comuna</Form.Label>
                  <Form.Control type="text" defaultValue={user.comuna} readOnly />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formCalle">
                  <Form.Label>Calle y Número</Form.Label>
                  <Form.Control type="text" placeholder="Ej: Av. Siempre Viva 123" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formDepto">
                  <Form.Label>Departamento (Opcional)</Form.Label>
                  <Form.Control type="text" placeholder="Ej: Depto. 42" />
                </Form.Group>

                <hr className="my-4" />

                <Button variant="primary" type="submit" className="w-100" size="lg">
                  Pagar ahora ${total.toLocaleString()}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Columna del Resumen del Carrito */}
        <Col md={5}>
          <Card className="shadow-sm">
            <Card.Body>
              <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-primary">Tu Carrito</span>
                <span className="badge bg-primary rounded-pill">{items.length}</span>
              </h4>
              <ListGroup variant="flush">
                {items.map((item) => (
                  <ListGroup.Item key={item.nombre} className="d-flex justify-content-between lh-sm">
                    <div>
                      <h6 className="my-0">{item.titulo}</h6>
                      <small className="text-muted">Cantidad: {item.cantidad}</small>
                    </div>
                    <span className="text-muted">${(Number(item.precio.replace(/[^\d]/g, "")) * item.cantidad).toLocaleString()}</span>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item className="d-flex justify-content-between">
                  <span>Total (CLP)</span>
                  <strong>${total.toLocaleString()}</strong>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
