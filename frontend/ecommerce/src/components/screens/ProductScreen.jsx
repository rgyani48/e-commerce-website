import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Container,
  Form,
} from "react-bootstrap";
import Rating from "../Rating.jsx";
import { listProductDetails } from "../../actions/productsActions.jsx";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Message.jsx";
import Loader from "../Loader.jsx";
import { addToCart } from "../../actions/cartActions.jsx";

function ProductScreen(params) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { error, loading, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

  const addToCartHandler = () => {
  dispatch(addToCart(id, qty));
  navigate("/cart");
};

  return (
    <Container>
      <div>
        <Link to="/" className="btn btn-dark my-3">
          Go Back
        </Link>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Row>
            <Col md={6}>
              <Image
                src={`http://127.0.0.1:8000${product.image}`}
                alt={product.name}
                fluid
              />
            </Col>

            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.productname}</h3>
                </ListGroup.Item>

                <ListGroup.Item>Brand: {product.productbrand}</ListGroup.Item>

                <ListGroup.Item>
                  Category: {product.productcategory}
                </ListGroup.Item>

                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.rating} ratings`}
                  />
                </ListGroup.Item>

                <ListGroup.Item>Price: ₹{product.price}</ListGroup.Item>

                <ListGroup.Item>
                  Description: {product.productinfo}
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>₹{product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>status:</Col>
                      <Col>
                        {product.stockcount > 0
                          ? "In Stock"
                          : "Out of Stock"}{" "}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.stockcount > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>

                        <Col xs="auto">
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                          >
                            {[...Array(product.stockcount).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      className="btn-block btn-success"
                      disabled={product.stockcount === 0}
                      type="button"
                      onClick={addToCartHandler}
                    >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        )}
      </div>
    </Container>
  );
}

export default ProductScreen;
