import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Card, Button } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Message.jsx";
import Loader from "../Loader.jsx";
import { validPassword } from "./Regex.jsx";
import { login } from "../../actions/userActions.jsx";

function LoginScreen() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(login(email, password));
  };

  return (
    <>
      <Container className="my-3">
        <Row>
          <Col md={4}></Col>
          <Col md={4}>
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant="danger">{error}</Message>
            ) : (
              <Card>
                <Card.Header
                  as="h3"
                  className="text-center bg-black text-light"
                >
                  Login
                </Card.Header>

                <Card.Body>
                  <Form onSubmit={submitHandler}>
                    {/* Email */}
                    <Form.Group className="mb-3" controlId="email">
                      <Form.Label>
                        <span>
                          <i className="fa-solid fa-envelope"></i>
                        </span>{" "}
                        Email
                      </Form.Label>

                      <Form.Control
                        type="email"
                        placeholder="Enter Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                        required
                      />
                    </Form.Group>

                    {/* Password */}
                    <Form.Group className="mb-3" controlId="pass1">
                      <Form.Label>Password</Form.Label>

                      <div className="position-relative">
                        <Form.Control
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter Your Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          autoComplete="new-password"
                          className="pe-5"
                          required
                        />

                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="btn position-absolute top-50 end-0 translate-middle-y border-0"
                        >
                          <i
                            className={`fa-solid ${
                              showPassword ? "fa-eye-slash" : "fa-eye"
                            }`}
                          ></i>
                        </button>
                      </div>
                    </Form.Group>

                    <div className="d-grid gap-2">
                      <Button
                        className="btn-md"
                        variant="success"
                        type="submit"
                      >
                        Login
                      </Button>
                    </div>
                  </Form>

                  <Row className="py-3">
                    <Col>
                      New User? <Link to="/signup">Signup</Link>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            )}
          </Col>

          <Col md={4}></Col>
        </Row>
      </Container>
    </>
  );
}

export default LoginScreen;
