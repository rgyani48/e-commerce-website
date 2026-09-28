import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

function FeaturesScreen() {
  const features = [
    {
      icon: "🛍️",
      title: "Wide Range of Products",
      description:
        "Browse and explore a variety of products from different categories.",
    },
    {
      icon: "🔍",
      title: "Easy Product Browsing",
      description:
        "View product details, prices, ratings, stock availability, and product information.",
    },
    {
      icon: "🛒",
      title: "Shopping Cart",
      description:
        "Add multiple products to your cart, update quantities, and remove products whenever you want.",
    },
    {
      icon: "🔐",
      title: "User Authentication",
      description:
        "Create an account, log in securely, and manage your shopping experience.",
    },
    {
      icon: "📦",
      title: "Product Availability",
      description:
        "Check available stock and select the required quantity before adding a product to your cart.",
    },
    {
      icon: "📱",
      title: "Responsive Design",
      description:
        "Enjoy a smooth shopping experience across desktops, tablets, and mobile devices.",
    },
  ];

  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <h1>Features</h1>
        <p className="text-muted">
          Explore the features of our e-commerce platform
        </p>
      </div>

      <Row>
        {features.map((feature) => (
          <Col md={6} lg={4} className="mb-4" key={feature.title}>
            <Card className="h-100 shadow-sm border-0">
              <Card.Body className="text-center p-4">
                <div className="fs-1 mb-3">
                  {feature.icon}
                </div>

                <Card.Title>
                  {feature.title}
                </Card.Title>

                <Card.Text className="text-muted">
                  {feature.description}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default FeaturesScreen;