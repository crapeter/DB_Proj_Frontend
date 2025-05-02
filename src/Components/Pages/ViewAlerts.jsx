import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Misc/AuthContext";
import axios from "axios";
import "../../CSS/Alerts.css";

const ViewAlertsPage = () => {
  const nav = useNavigate();
  const isLoggedIn = useAuth();
  const [defaultAlerts, setDefaultAlerts] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [date, setDate] = useState("");

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await axios.get("/api/alerts/previous");
        setAlerts(response.data);
        setDefaultAlerts(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAlerts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetDate = () => {
    setDate("");
    setAlerts(defaultAlerts);
  };

  const updateDate = async (e) => {
    e.preventDefault();

    setDate(e.target.value);
    const newDateTime = `${e.target.value}T00:00:00`;

    try {
      const response = await axios.get("/api/alerts/specific/day", {
        params: {
          day: newDateTime,
        },
      });
      setAlerts(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const createAlert = () => {
    nav("/Create_Alert");
  };

  const toHomePage = () => {
    nav("/");
  };

  if (!isLoggedIn.isLoggedIn) {
    return <div>Please log in to view this page.</div>;
  }

  return (
    <div className="alerts-container">
      <div className="view-alerts-container">
        <div className="nav-buttons">
          <h4 className="return-button" onClick={toHomePage}>
            To Home Page
          </h4>
          <h3 className="return-button" onClick={createAlert}>
            Create Alert
          </h3>
        </div>
        <h1 className="alerts-title">Live Alerts</h1>

        <form className="alert-form">
          <Form.Group controlId="formBasicDate">
            <Form.Label
              style={{
                borderRadius: "5px",
                color: "black",
                fontSize: "1.1rem",
                textAlign: "center",
                border: "1px solid #555",
                backgroundColor: "#ff944d",
                fontWeight: "bold",
              }}
            >
              See alerts for a specific day below
            </Form.Label>
            <Form.Control
              type="date"
              value={date}
              onChange={(e) => updateDate(e)}
              required
            />
          </Form.Group>
          <Button onClick={resetDate}>Reset Date</Button>
        </form>

        <div className="alert-form-container">
          <div className="alerts-list">
            {alerts.map((alert, index) => (
              <div key={index} className="alert-card">
                <div className="alert-header">Alerts</div>
                <div className="alert-body">
                  <p>
                    <strong>Alert Type:</strong> {alert.alertType}
                  </p>
                  <p>
                    <strong>Severity:</strong> {alert.severity}
                  </p>
                  <p>
                    <strong>Location:</strong> {alert.location}
                  </p>
                  <p>
                    <strong>Caller Email:</strong> {alert.callerEmail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAlertsPage;
