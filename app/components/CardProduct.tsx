"use client";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function CardProduct({titulo, imagen, texto, direccion}: {titulo?: string, imagen?: string, texto?: string, direccion?: string}) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={imagen} />
      <Card.Body>
        <Card.Title>{titulo}</Card.Title>
        <Card.Text>
          {texto}
        </Card.Text>
        <Button variant="primary" href={direccion}>Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default CardProduct;