import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

function AboutScreen() {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <Card className="shadow-sm border-0">
            <Card.Body className="p-5">
              <h1 className="text-center mb-4">About Us</h1>

              <p className="lead text-center">
                Welcome to our e-commerce website!
              </p>

              <p>
                Our platform is designed to provide a simple, secure, and
                convenient online shopping experience. Customers can browse
                products, view product details, add products to their cart,
                and manage their shopping items easily.
              </p>

              <p>
                We are continuously working to improve our website and provide
                a better experience for our customers.
              </p>

              <hr />

              <h4>What We Offer</h4>

              <ul>
                <li>Wide range of products</li>
                <li>Easy product browsing</li>
                <li>Simple shopping cart management</li>
                <li>Secure user authentication</li>
                <li>Fast and convenient shopping experience</li>
              </ul>

              <h4 className="mt-4">Our Goal</h4>

              <p className="mb-0">
                Our goal is to build a user-friendly e-commerce platform that
                makes online shopping simple and accessible for everyone.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AboutScreen;