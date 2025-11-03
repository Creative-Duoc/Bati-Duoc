"use client";
import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Table, Alert } from "react-bootstrap";
import { useRouter } from "next/navigation";

// Define una interfaz para los datos del pedido para mayor seguridad de tipos
interface OrderData {
  user: {
    nombre: string;
    apellido: string;
    email: string;
    region: string;
    comuna: string;
  };
  items: {
    titulo: string;
    precio: string;
    cantidad: number;
    imagen: string;
  }[];
  total: number;
  orderId: string;
}

export default function PagoExitoso() {
  const router = useRouter();
  const [orderData, setOrderData] = useState<OrderData | null>(null);

  useEffect(() => {
    // Recuperar los datos del pedido desde sessionStorage
    const savedOrderData = sessionStorage.getItem("lastOrder");
    if (savedOrderData) {
      setOrderData(JSON.parse(savedOrderData));
    } else {
      // Si no hay datos, redirigir al inicio, ya que no se puede mostrar un resumen
      router.push("/");
    }
  }, [router]);

  if (!orderData) {
    return <Container className="text-center py-5">Cargando resumen del pedido...</Container>;
  }

  const { user, items, total, orderId } = orderData;

  const handleDownloadTxt = () => {
    if (!orderData) return;

    let content = `Resumen de Compra - Nro #${orderId}\n`;
    content += `==================================\n\n`;
    content += `Código orden: ${orderId}\n\n`;

    content += `Información del Cliente\n`;
    content += `-----------------------\n`;
    content += `Nombre: ${user.nombre} ${user.apellido}\n`;
    content += `Correo: ${user.email}\n`;
    content += `Región: ${user.region}\n`;
    content += `Comuna: ${user.comuna}\n\n`;

    content += `Detalle de la Compra\n`;
    content += `----------------------\n`;
    items.forEach(item => {
      const subtotal = Number(item.precio.replace(/[^\d]/g, "")) * item.cantidad;
      content += `- ${item.titulo} (x${item.cantidad}) - $${subtotal.toLocaleString()}\n`;
    });

    content += `\n----------------------\n`;
    content += `Total pagado: $${total.toLocaleString()}\n`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `boleta-${orderId}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Container className="py-5">
      <Card className="shadow-sm">
        <Card.Body>
          <div className="text-center mb-4">
            <h2 className="text-success">✓ Se ha realizado la compra. nro #{orderId}</h2>
            <p className="text-muted">Código orden: {orderId}</p>
          </div>

          <Row className="mb-4">
            <Col md={6}>
              <h5>Información del Cliente</h5>
              <p className="mb-1"><strong>Nombre:</strong> {user.nombre} {user.apellido}</p>
              <p className="mb-1"><strong>Correo:</strong> {user.email}</p>
            </Col>
            <Col md={6}>
              <h5>Dirección de Entrega</h5>
              <p className="mb-1"><strong>Región:</strong> {user.region}</p>
              <p className="mb-1"><strong>Comuna:</strong> {user.comuna}</p>
              {/* Puedes agregar más detalles si los tienes */}
            </Col>
          </Row>

          <h5>Detalle de la Compra</h5>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td>
                    <img src={item.imagen} alt={item.titulo} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                  </td>
                  <td>{item.titulo}</td>
                  <td>${Number(item.precio.replace(/[^\d]/g, "")).toLocaleString()}</td>
                  <td>{item.cantidad}</td>
                  <td>${(Number(item.precio.replace(/[^\d]/g, "")) * item.cantidad).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="text-end mt-4">
            <h3>Total pagado: ${total.toLocaleString()}</h3>
          </div>

          <div className="d-flex justify-content-center gap-2 mt-4">
            <Button variant="primary" onClick={handleDownloadTxt}>Descargar Boleta (.txt)</Button>
            <Button variant="success">Enviar boleta por email</Button>
          </div>

        </Card.Body>
      </Card>
    </Container>
  );
}
