
import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

function PricingScreen() {
  const plans = [
    {
      name: "Basic",
      price: "Free",
      description: "For users who want to explore our e-commerce platform.",
      features: [
        "Browse products",
        "View product details",
        "Product ratings",
        "Add products to cart",
      ],
      button: "Get Started",
    },
    {
      name: "Standard",
      price: "₹499",
      description: "For regular shoppers who want a better shopping experience.",
      features: [
        "All Basic features",
        "Multiple products in cart",
        "Quantity management",
        "Stock availability",
        "User account",
      ],
      button: "Choose Standard",
    },
    {
      name: "Premium",
      price: "₹999",
      description: "For users looking for a complete shopping experience.",
      features: [
        "All Standard features",
        "Priority support",
        "Exclusive offers",
        "Faster shopping experience",
        "Premium user benefits",
      ],
      button: "Choose Premium",
    },
  ];

  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <h1>Pricing</h1>
        <p className="text-muted">
          Choose a plan that works best for you
        </p>
      </div>

      <Row className="justify-content-center">
        {plans.map((plan) => (
          <Col md={6} lg={4} className="mb-4" key={plan.name}>
            <Card className="h-100 shadow-sm text-center">
              <Card.Body className="p-4">
                <Card.Title className="fs-3">
                  {plan.name}
                </Card.Title>

                <h2 className="my-4">
                  {plan.price}
                  {plan.price !== "Free" && (
                    <small className="text-muted fs-6"> / month</small>
                  )}
                </h2>

                <Card.Text className="text-muted">
                  {plan.description}
                </Card.Text>

                <hr />

                <ul className="list-unstyled text-start">
                  {plan.features.map((feature) => (
                    <li key={feature} className="mb-2">
                      ✅ {feature}
                    </li>
                  ))}
                </ul>

                <Button variant="dark" className="w-100 mt-3">
                  {plan.button}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default PricingScreen;

