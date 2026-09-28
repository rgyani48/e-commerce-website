import React, { useEffect, useState } from "react";
import { Container, Card, Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch  } from "react-redux";
import { listOrders, cancelOrder,
 } from "../../actions/orderActions.jsx";

function MyOrdersScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;


  const cancelOrderHandler = async (orderId) => {
  const result = await dispatch(cancelOrder(orderId));

  if (result.success) {
    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order.order_id === orderId
          ? {
              ...order,
              status: "Cancelled",
            }
          : order
      )
    );
  } else {
    setError(result.error || "Failed to cancel order.");
  }
};


  useEffect(() => {
    const getOrders = async () => {
      if (!userInfo) {
        navigate("/login");
        return;
      }

      const result = await listOrders()(
        () => {},
        () => ({
          userLogin: {
            userInfo,
          },
        })
      );

      if (result.success) {
        setOrders(result.data);
      } else {
        setError(result.error || "Failed to load orders.");
      }

      setLoading(false);
    };

    getOrders();
  }, [userInfo, navigate]);

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <h3>Loading orders...</h3>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Card className="text-center">
          <Card.Body>
            <h4 className="text-danger">{error}</h4>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h1 className="mb-4">My Orders</h1>

      {orders.length === 0 ? (
        <Card className="shadow-sm text-center">
          <Card.Body className="p-5">
            <h4>No orders found</h4>

            <p className="text-muted">
              You have not placed any orders yet.
            </p>

            <Button
              variant="dark"
              onClick={() => navigate("/")}
            >
              Start Shopping
            </Button>
          </Card.Body>
        </Card>
      ) : (
        orders.map((order) => (
          <Card
            className="shadow-sm mb-4"
            key={order.order_id}
          >
            <Card.Body>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h5 className="mb-1">
                    Order #{order.order_id}
                  </h5>

                  <small className="text-muted">
                    {new Date(order.created_at).toLocaleString()}
                  </small>
                </div>

                <span
                  className={`badge ${
                    order.status === "Cancelled"
                      ? "bg-danger"
                      : "bg-success"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <Table responsive bordered>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                  </tr>
                </thead>

                <tbody>
                  {order.items.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>

                      <td>{item.qty}</td>

                      <td>
                        ₹{Number(item.price).toFixed(2)}
                      </td>

                      <td>
                        ₹
                        {(
                          Number(item.price) *
                          Number(item.qty)
                        ).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <h5 className="text-end">
                Order Total: ₹
                {Number(order.total).toFixed(2)}
              </h5>

              {order.status === "Order Placed" && (
                <div className="text-end mt-3">
                  <Button
                    variant="danger"
                    onClick={() =>
                      cancelOrderHandler(order.order_id)
                    }
                  >
                    Cancel Order
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
}

export default MyOrdersScreen;