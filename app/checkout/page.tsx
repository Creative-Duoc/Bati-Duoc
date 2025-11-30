"use client";
import { useEffect } from "react";
import { Container, Row, Col, Card, Form, Button, ListGroup } from "react-bootstrap";
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

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simular pago con probabilidad de fallo (esto lo mantenemos como simulación de pasarela)
    const isSuccess = Math.random() > 0.50; // 50% de éxito para probar

    if (isSuccess) {
      try {
        // ------------------------------------------------------------------------------------------------
        // PREPARACIÓN DE DATOS PARA LA BASE DE DATOS
        // ------------------------------------------------------------------------------------------------
        
        // Creamos el objeto 'orderData' que coincide EXACTAMENTE con la estructura que espera Java (DTOPedido).
        const orderData = {
          // 'idUsuario': Obtenido del contexto de autenticación (user.id).
          // Es fundamental para saber QUIÉN hizo la compra en la tabla 'pedidos'.
          idUsuario: user!.id,
          
          // 'direccionEnvio': Concatenamos Región, Comuna y Calle para guardar una dirección completa en un solo campo de texto.
          // Usamos 'document.getElementById' para obtener el valor del input de calle que no está en un estado de React.
          direccionEnvio: `${user!.region}, ${user!.comuna}, ${(document.getElementById('formCalle') as HTMLInputElement).value}`,
          
          // 'total': El monto total calculado previamente con reduce().
          total: total,
          
          // 'detalles': Transformamos el array de items del carrito al formato que espera Java (DTODetallePedido).
          // Java espera una lista de objetos con: nombreProducto, precio y cantidad.
          detalles: items.map(item => ({
            nombreProducto: item.nombre, // Nombre del producto
            precio: Number(item.precio.replace(/[^\d]/g, "")), // Precio limpio (sin signos $)
            cantidad: item.cantidad // Cantidad comprada
          }))
        };

        // ------------------------------------------------------------------------------------------------
        // ENVÍO A LA BASE DE DATOS (BACKEND)
        // ------------------------------------------------------------------------------------------------
        
        // 'fetch': Enviamos la orden al endpoint '/clients/orders' que creamos en el controlador Java.
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clients/orders`, {
          method: "POST", // POST para crear un nuevo registro
          headers: { "Content-Type": "application/json" }, // Indicamos que enviamos JSON
          body: JSON.stringify(orderData) // Convertimos el objeto JS a texto JSON
        });

        // Si el backend guardó todo correctamente (status 200 OK)
        if (response.ok) {
          clearCart(); // Vaciamos el carrito visualmente
          router.push("/pago-exitoso"); // Redirigimos al éxito
        } else {
          console.error("Error al guardar pedido");
          router.push("/pago-fallido"); // Si falló el guardado en BD, mostramos error
        }
      } catch (error) {
        console.error("Error de conexión", error);
        router.push("/pago-fallido"); // Si falló la conexión (servidor apagado), mostramos error
      }
    } else {
      // Si la simulación de pago (Math.random) falló (simulando tarjeta rechazada)
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
