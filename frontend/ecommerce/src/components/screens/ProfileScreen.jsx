import React, { useEffect } from "react";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader.jsx";
import Message from "../Message.jsx";
import { getUserProfile } from "../../actions/userActions.jsx";

function ProfileScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userProfile = useSelector((state) => state.userProfile);
  const { loading, error, profile } = userProfile;

  useEffect(() => {
    if (userInfo) {
      dispatch(getUserProfile());
    }
  }, [dispatch, userInfo]);

  if (!userInfo) {
    return (
      <Container className="py-5 text-center">
        <h3>Please login to view your profile</h3>

        <Button
          variant="dark"
          className="mt-3"
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h1 className="mb-4">My Profile</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={8} lg={6}>
            <Card className="shadow-sm">
              <Card.Body className="p-4">

                <div className="text-center mb-4">
                  <div
                    className="rounded-circle bg-dark text-white d-flex align-items-center justify-content-center mx-auto"
                    style={{
                      width: "100px",
                      height: "100px",
                      fontSize: "40px",
                    }}
                  >
                    {profile?.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>

                  <h3 className="mt-3">
                    {profile?.name || "Set Your Name"}
                  </h3>
                </div>

                <hr />

                <div className="mb-3">
                  <strong>Name:</strong>
                  <p>{profile?.name || "Not available"}</p>
                </div>

                <div className="mb-3">
                  <strong>Email:</strong>
                  <p>{profile?.email || "Not available"}</p>
                </div>

                <div className="mb-3">
                  <strong>Account Type:</strong>
                  <p>
                    {profile?.isAdmin
                      ? "Administrator"
                      : "Customer"}
                  </p>
                </div>

                <Button
                  variant="dark"
                  className="w-100"
                  onClick={() => navigate("/")}
                >
                  Continue Shopping
                </Button>

              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default ProfileScreen;