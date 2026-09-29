import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Card,
  Button,
  Container,
  Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Message.jsx";
import { addToCart, removeFromCart } from "../../actions/cartActions.jsx";

function CartScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get qty from ?qty=2

  const cart = useSelector((state) => state.cart);
  const { cartItems = [] } = cart;

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <Container>
      <Link to="/" className="btn btn-dark my-3">
        Go Back
      </Link>

      <h1>Shopping Cart</h1>

      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <Message variant="info">
              Your cart is empty. <Link to="/">Go Shopping</Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row className="align-items-center">
                    <Col md={2}>
                      <img
                        src={`${import.meta.env.VITE_API_URL}/static${item.image}`}
                        alt={item.name}
                        className="img-fluid rounded"
                      />
                    </Col>

                    <Col md={3}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>

                    <Col md={2}>₹{item.price}</Col>

                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value)),
                          )
                        }
                      >
                        {[...Array(item.stockcount).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>

                    <Col md={2}>
                      <Button
                        type="button"
                        variant="danger"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>
                  Subtotal (
                  {cartItems.reduce((acc, item) => acc + Number(item.qty), 0)}{" "}
                  items)
                </h2>

                <h3>
                  ₹
                  {cartItems
                    .reduce(
                      (acc, item) =>
                        acc + Number(item.qty) * Number(item.price),
                      0,
                    )
                    .toFixed(2)}
                </h3>
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  variant="dark"
                  className="w-100"
                  disabled={cartItems.length === 0}
                  onClick={() => navigate("/order-success")}
                >
                  Proceed to Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default CartScreen;
