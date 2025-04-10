import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useAuth } from "../Misc/AuthContext";

const HomePage = () => {
  const nav = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toRegisterPage = () => {
    nav("/Register");
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="home-page">
      {isLoggedIn ? (
        <div>
          <h1>Welcome to the Home Page</h1>
          <p>{JSON.stringify(isLoggedIn)} </p>
        </div>
      ) : (
        <div>
          <p>{JSON.stringify(isLoggedIn)} </p>
          <h2>Login</h2>
          <Button onClick={logout}>Logout</Button>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
                <div className="register-link">
                  <p>Don't have an account?</p>
                  <Button variant="link" onClick={toRegisterPage}>
                    Register
                  </Button>
                </div>
              </div>
            </Form.Group>
          </Form>
        </div>
      )}
    </div>
  );
};

export default HomePage;
