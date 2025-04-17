import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../CSS/Alerts.css";

const AlertsPage = () => {
  const nav = useNavigate();
  const [alerts, setAlerts] = useState([]);
  const [newAlert, setNewAlert] = useState({
    category: "",
    location: "",
    status: "Active",
  });

  useEffect(() => {
    // Simulate fetching previous day + today's alerts
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const exampleAlerts = [
      {
        timestamp: new Date().toISOString(),
        category: "Weather",
        location: "Downtown",
        status: "Active",
      },
      {
        timestamp: yesterday.toISOString(),
        category: "Power Outage",
        location: "East Side",
        status: "Resolved",
      },
    ];
    setAlerts(exampleAlerts);
  }, []);

  const handleChange = (e) => {
    setNewAlert({ ...newAlert, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      ...newAlert,
      timestamp: new Date().toISOString(),
    };
    setAlerts([newEntry, ...alerts]);
    setNewAlert({ category: "", location: "", status: "Active" });
  };

  const toHomePage = () => {
    nav("/");
  }

  return (
    <div className="alerts-container">
      <h1 className="alerts-title">Live Alerts</h1>

      <form className="alert-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={newAlert.category}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={newAlert.location}
          onChange={handleChange}
          required
        />
        <select name="status" value={newAlert.status} onChange={handleChange}>
          <option value="Active">Active</option>
          <option value="Resolved">Resolved</option>
        </select>
        <button type="submit">Create Alert</button>
      </form>

      {alerts.map((alert, index) => (
        <div key={index} className="alert-card">
          <div className="alert-header">Active Example</div>
          <div className="alert-body">
            <p>
              <strong>Timestamp:</strong>{" "}
              {new Date(alert.timestamp).toLocaleString()}
            </p>
            <p>
              <strong>Category:</strong> {alert.category}
            </p>
            <p>
              <strong>Location:</strong> {alert.location}
            </p>
            <p>
              <strong>Status:</strong> {alert.status}
            </p>
          </div>
        </div>
      ))}

      <div className="back-button">
        <button onClick={toHomePage}>&larr;</button>
      </div>
    </div>
  );
};

export default AlertsPage;
