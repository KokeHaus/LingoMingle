import React from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';

const navbarHeight = '56px';

const Mingle = () => {
  return (
    <Container style={{ paddingTop: navbarHeight, backgroundColor: '#f0f8ff', height: `calc(100vh - ${navbarHeight})`, maxWidth: '100vw' }} className="d-flex justify-content-center align-items-center">
      <Card style={{ width: '30rem', padding: '20px' }}>
        <Card.Body>
          <h3 className="text-center mb-4">Start Mingling!</h3>
          <Row className="mb-3">
            <Col className="text-center">
              <Button variant="outline-primary" size="lg" className="w-100 mb-3">
                Text
              </Button>
            </Col>
          </Row>
          <Row>
            <Col className="text-center">
              <Button variant="outline-secondary" size="lg" className="w-100">
                Audio
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Mingle;
