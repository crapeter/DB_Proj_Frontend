import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useAuth } from "../Misc/AuthContext";
import "../../CSS/Home.css";

const HomePage = () => {
  const nav = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toRegisterPage = () => {
    nav("/Register");
  };

  const createAlert = () => {
    nav("/Incident_Reports");
  };

  const viewReports = () => {
    nav("/Dispatch_Panel");
  };

  const logout = () => {
    setIsLoggedIn(false);
    setEmail("");
    setPassword("");
  };

  const login = (e) => {
    e.preventDefault();
    // API call goes here eventually
    setIsLoggedIn(true);
  };

  return (
    <div className="home-page">
      {isLoggedIn ? (
        <div className="phone-frame">
          <Button className="logout-button" type="submit" onClick={logout}>
            Logout
          </Button>
          <div className="notch"></div>

          <div className="top-bar">
            <div className="icon"></div>
            <h2 className="dashboard-title">Home Dashboard</h2>
            <div className="icon-group">
              <div className="icon"></div>
              <div className="icon"></div>
            </div>
          </div>

          <div className="content">
            <div className="section">
              <div className="label" id="live_alert_id" onClick={createAlert}>
                Live Alerts
              </div>
              <div className="box">Stuff to be added here</div>
            </div>
          </div>

          <div className="section">
            <div
              className="label"
              id="incident_report_id"
              onClick={viewReports}
            >
              Incident Report
            </div>
            <div className="box">Stuff to be added here</div>
          </div>

          <div className="section center">
            <div className="label">Safety Tips</div>
            <div className="box tall">Stuff to be added here</div>
          </div>
        </div>
      ) : (
        <div className="login-form">
          <h2>Login</h2>
          <Form onSubmit={login}>
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
                <Button type="submit">
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
