"use client";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function CardProduct({ titulo, imagen, texto, direccion, accion, precio }: { titulo?: string, imagen?: string, texto?: string, direccion?: string, accion?: string, precio?: string }) {
  return (
    <Card style={{ width: '18rem', height: '320px' }}>
      <Card.Img
        variant="top"
        src={imagen}
        style={{
          width: '100%',
          height: '180px',
          objectFit: 'cover',
          borderRadius: '12px 12px 0 0'
        }}
      />
      <Card.Body>
          <Card.Title>{titulo}</Card.Title>
          {precio && (
            <div className="text-green-700 fw-bold mb-2">{precio}</div>
          )}
        <Card.Text>{texto}</Card.Text>
        <Button variant="primary" href={direccion}>{accion}</Button>
      </Card.Body>
    </Card>
  );
}

export default CardProduct;