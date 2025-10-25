
import  Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";

function Footer() {

	return (
		<footer className="border-t mt-8 py-4">
			<Container>
				<Row className="align-items-center">
					<Col xs={12} md={4} className="text-start mb-3 mb-md-0">
						<strong>Bati-Duoc</strong>
					</Col>

					<Col xs={12} md={4} className="text-center mb-3 mb-md-0">
						<div className="d-flex justify-content-center align-items-center gap-3 mb-2">
							{/* Place your payment icons in public/icons/*.svg or adjust the paths */}
							<img src="/icons/visa.svg" alt="Visa" style={{ height: 22 }} />
							<img src="/icons/mastercard.svg" alt="Mastercard" style={{ height: 22 }} />
							<img src="/icons/paypal.svg" alt="PayPal" style={{ height: 22 }} />
						</div>
						<small className="text-muted">© 2024 Bati-Duoc. Todos los derechos reservados.</small>
					</Col>

					<Col xs={12} md={4} className="text-end">
						<Form  className="d-flex justify-content-end">
							<InputGroup>
								<Form.Control
									type="email"
									placeholder="Enter Email"
									aria-label="Email"
								/>
								<Button variant="dark" type="submit">
									Suscribirse
								</Button>
							</InputGroup>
						</Form>
					</Col>
				</Row>
			</Container>
		</footer>
	);
};

export default Footer;
