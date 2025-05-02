import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { ChevronRight } from "lucide-react";
import { useAuth } from "../Misc/AuthContext";
import axios from "axios";
import "../../CSS/Home.css";

const HomePage = () => {
  const nav = useNavigate();
  const { isLoggedIn, setIsLoggedIn, setUserEmail, userEmail } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dependents, setDependents] = useState([]);

  useEffect(() => {
    if (isLoggedIn && userEmail) {
      axios
        .get("/api/ec/get", { params: { email: userEmail } })
        .then((res) => {
          setDependents(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [isLoggedIn, userEmail]);

  const toRegisterPage = () => {
    nav("/Register");
  };

  const createAlert = () => {
    nav("/Alerts");
  };

  const viewReports = () => {
    nav("/Incident_Reports");
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserEmail("");
    setEmail("");
    setPassword("");
  };

  const login = (e) => {
    e.preventDefault();
    axios
      .get("/api/users/login", {
        params: { email, password },
      })
      .then((res) => {
        if (res.data) {
          setIsLoggedIn(true);
          setUserEmail(email);
          nav("/");
        } else {
          alert("Invalid email or password");
        }
      })
      .catch((err) => {
        console.error(err);
      });
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
                <span>Live Alerts</span>
                <ChevronRight size={20} />
              </div>
              <div className="box">Stuff to be added here</div>
            </div>
          </div>

          <div className="content">
            <div className="section">
              <div
                className="label"
                id="incident_report_id"
                onClick={viewReports}
              >
                <span>Incident Report</span>
                <ChevronRight size={20} />
              </div>
              <div className="box">Stuff to be added here</div>
            </div>
          </div>

          <div className="section center">
            <div className="label">Your Dependents</div>
            <div className="box tall">
              {dependents.length > 0 ? (
                dependents.map((dep, index) => (
                  <div key={index}>
                    {dep.fName} {dep.mInit}. {dep.lName}
                  </div>
                ))
              ) : (
                <div>No dependents found.</div>
              )}
            </div>
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
                <Button type="submit">Submit</Button>
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
