import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Message.jsx";
import Loader from "../Loader.jsx";
import { validPassword } from "./Regex.jsx";
import { signup } from "../../actions/userActions.jsx";
function SignupScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const userSignup = useSelector((state) => state.userSignup);
  const { error, loading, userInfo } = userSignup;

  useEffect(() => {
    if (userInfo) {
      setMessage(userInfo.details);

      setFname("");
      setLname("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

    }
  }, [userInfo, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setMessage("");
    if (password !== confirmPassword) {
      setMessage("Password do not match.");
      return;
    }
    if (!validPassword.test(password)) {
      setMessage("Password criteria does not match.");
      return;
    }
    const result = await dispatch(signup(fname, lname, email, password));
  };
  return (
    <>
      {" "}
      <Container className="my-3">
        {" "}
        <Row>
          {" "}
          <Col md={4}></Col>{" "}
          <Col md={4}>
            {" "}
            <Card>
              {" "}
              <Card.Header as="h3" className="text-center bg-black text-light">
                {" "}
                Signup{" "}
              </Card.Header>{" "}
              <Card.Body>
                {message && <Message variant="success">{message}</Message>}
                {error && <Message variant="danger">{error}</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                  {" "}
                  {/* First Name */}{" "}
                  <Form.Group className="mb-3" controlId="fname">
                    {" "}
                    <Form.Label>
                      {" "}
                      <i className="fa fa-user"></i> First Name{" "}
                    </Form.Label>{" "}
                    <Form.Control
                      type="text"
                      placeholder="Enter Your First Name"
                      value={fname}
                      onChange={(e) => setFname(e.target.value)}
                      required
                    />{" "}
                  </Form.Group>{" "}
                  {/* Last Name */}{" "}
                  <Form.Group className="mb-3" controlId="lname">
                    {" "}
                    <Form.Label>
                      {" "}
                      <i className="fa fa-user"></i> Last Name{" "}
                    </Form.Label>{" "}
                    <Form.Control
                      type="text"
                      placeholder="Enter Your Last Name"
                      value={lname}
                      onChange={(e) => setLname(e.target.value)}
                      required
                    />{" "}
                  </Form.Group>{" "}
                  {/* Email */}{" "}
                  <Form.Group className="mb-3" controlId="email">
                    {" "}
                    <Form.Label>
                      {" "}
                      <i className="fa-solid fa-envelope"></i> Email{" "}
                    </Form.Label>{" "}
                    <Form.Control
                      type="email"
                      placeholder="Enter Your Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      required
                    />{" "}
                  </Form.Group>{" "}
                  {/* Password */}{" "}
                  <Form.Group className="mb-3" controlId="pass1">
                    {" "}
                    <Form.Label>Password</Form.Label>{" "}
                    <div className="position-relative">
                      {" "}
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter Your Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="new-password"
                        className="pe-5"
                        required
                      />{" "}
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="btn position-absolute top-50 end-0 translate-middle-y border-0"
                      >
                        {" "}
                        <i
                          className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                        ></i>{" "}
                      </button>{" "}
                    </div>{" "}
                  </Form.Group>{" "}
                  <small className="text-muted">
                    {" "}
                    Password must include at least 1 number, 1 uppercase letter,
                    1 special character (_ $ @ # ! .) and minimum 5
                    characters.{" "}
                  </small>{" "}
                  {/* Confirm Password */}{" "}
                  <Form.Group className="mb-3 mt-2" controlId="pass2">
                    {" "}
                    <Form.Label>Confirm Password</Form.Label>{" "}
                    <div className="position-relative">
                      {" "}
                      <Form.Control
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        autoComplete="new-password"
                        className="pe-5"
                        required
                      />{" "}
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="btn position-absolute top-50 end-0 translate-middle-y border-0"
                      >
                        {" "}
                        <i
                          className={`fa-solid ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}
                        ></i>{" "}
                      </button>{" "}
                    </div>{" "}
                  </Form.Group>{" "}
                  <div className="d-grid gap-2">
                    {" "}
                    <Button className="btn-md" variant="success" type="submit">
                      {" "}
                      Signup{" "}
                    </Button>{" "}
                  </div>{" "}
                </Form>{" "}
                <Row className="py-3">
                  {" "}
                  <Col>
                    {" "}
                    Already User? <Link to="/login">Log In</Link>{" "}
                  </Col>{" "}
                </Row>{" "}
              </Card.Body>{" "}
            </Card>{" "}
          </Col>{" "}
          <Col md={4}></Col>{" "}
        </Row>{" "}
      </Container>{" "}
    </>
  );
}
export default SignupScreen;
