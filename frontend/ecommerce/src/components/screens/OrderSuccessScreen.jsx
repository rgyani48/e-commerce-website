import React, { useEffect, useRef, useState } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createOrder } from "../../actions/orderActions.jsx";
import { CART_REMOVE_ITEM } from "../../constants/cartConstants";

function OrderSuccessScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems = [] } = cart;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [orderId, setOrderId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const orderPlacedRef = useRef(false);

  useEffect(() => {
  if (orderPlacedRef.current) return;

  orderPlacedRef.current = true;

  const placeOrder = async () => {
      if (!userInfo) {
        navigate("/login");
        return;
      }

      if (cartItems.length === 0) {
        navigate("/cart");
        return;
      }

      const result = await dispatch(createOrder(cartItems));

      if (result.success) {
        setOrderId(result.data.order_id);

        cartItems.forEach((item) => {
          dispatch({
            type: CART_REMOVE_ITEM,
            payload: item.product,
          });
        });

        localStorage.setItem("cartItems", JSON.stringify([]));

        setLoading(false);
      } else {
        setError(result.error || "Failed to place order.");
        setLoading(false);
      }
    };

    placeOrder();
  }, [dispatch, userInfo, navigate]);

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <h3>Placing your order...</h3>
        <p className="text-muted">
          Please wait while we confirm your order.
        </p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Card className="shadow-sm border-0 text-center">
          <Card.Body className="p-5">
            <h2 className="text-danger">
              Order Failed
            </h2>

            <p className="text-muted">
              {error}
            </p>

            <Button
              variant="dark"
              onClick={() => navigate("/cart")}
            >
              Back to Cart
            </Button>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <div className="row justify-content-center">
        <div className="col-md-7 col-lg-6">
          <Card className="shadow-sm border-0 text-center">
            <Card.Body className="p-5">

              <div
                className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center mx-auto mb-4"
                style={{
                  width: "90px",
                  height: "90px",
                  fontSize: "45px",
                }}
              >
                ✓
              </div>

              <h1 className="text-success mb-3">
                Order Successfully Placed!
              </h1>

              <p className="text-muted">
                Thank you for your order. Your order has been
                successfully placed.
              </p>

              <hr />

              <p className="mb-2">
                <strong>Order ID:</strong>
              </p>

              <p className="text-primary fw-bold">
                {orderId}
              </p>

              <p className="text-muted">
                You can view your order details from My Orders.
              </p>

              <div className="d-flex justify-content-center gap-2 mt-4">
                <Button
                  variant="dark"
                  onClick={() => navigate("/my-orders")}
                >
                  My Orders
                </Button>

                <Button
                  variant="outline-dark"
                  onClick={() => navigate("/")}
                >
                  Continue Shopping
                </Button>
              </div>

            </Card.Body>
          </Card>
        </div>
      </div>
    </Container>
  );
}

export default OrderSuccessScreen;