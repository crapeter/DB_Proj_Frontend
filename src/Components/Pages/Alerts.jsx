import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../CSS/Alerts.css";

const AlertsPage = () => {
  const nav = useNavigate();
  const [defaultAlerts, setDefaultAlerts] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [date, setDate] = useState("");
  const [newAlert, setNewAlert] = useState({
    alertType: "",
    severity: "",
    location: "",
    callerEmail: "",
    resourceType: [],
  });
  const [resourceTypeSelection, setResourceTypeSelection] = useState([]);
  const emergencyEquipment = [
    "Radio",
    "Emergency Vehicle",
    "Command Kit",
    "Satellite Phone",
    "Fire Engine",
    "Fire Hose",
    "Breathing Apparatus",
    "Fire Retardant",
    "Firefighter Protective Gear",
    "Search Drone",
    "Search Dog",
    "Rescue Tool Kit",
    "Rope and Harness Set",
    "Thermal Camera",
    "Ambulance",
    "First Aid Kit",
    "Trauma Supply Pack",
    "Field Hospital Tent",
    "Stretcher",
    "Logistics Truck",
    "Fuel Reserve Tank",
    "Emergency Shelter Tent",
    "Water Container",
    "Portable Generator",
    "Barricade",
    "Traffic Cone",
    "Loudspeaker",
    "Flashlight",
    "Safety Signage Kit",
    "Hazmat Suit",
    "Chemical Sensor",
    "Neutralizing Agent",
    "Decontamination Shower",
    "Laptop",
    "Communication Server",
    "GIS Equipment Set",
    "Documentation Kit",
    "Portable Network Gear",
    "Satellite Internet Unit",
    "Battery Pack",
    "Backup Server Storage",
    "Map Kit",
    "Field Operations Kit",
    "All-Terrain Vehicle",
    "Field Drone",
    "Mobile Base Station",
  ];

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

    setResourceTypeSelection(emergencyEquipment);
    fetchAlerts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    setNewAlert({ ...newAlert, [e.target.name]: e.target.value });
  };

  const resetDate = () => {
    setDate("");
    setAlerts(defaultAlerts);
  };

  const updateDate = async (e) => {
    e.preventDefault();

    setDate(e.target.value);
    const newDateTime = `${e.target.value}T00:00:00`;
    console.log(newDateTime);

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

  const handleResourceChange = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setNewAlert({ ...newAlert, resourceType: selectedOptions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEntry = {
      ...newAlert,
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await axios.post("/api/alerts", newEntry);
      setAlerts([response.data, ...alerts]);
      setNewAlert({
        alertType: "",
        serverity: "",
        location: "",
        callerEmail: "",
        resourceType: [],
      });
    } catch (err) {
      console.error(err);
    }
  };

  const toHomePage = () => {
    nav("/");
  };

  return (
    <div className="alerts-container">
      <h1 className="alerts-title">Live Alerts</h1>

      <div className="alert-form-container">
        <form className="alert-form" onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicAlertType">
            <Form.Label>Alert Type</Form.Label>
            <Form.Control
              type="text"
              name="alertType"
              value={newAlert.alertType}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicSeverity">
            <Form.Label>Severity</Form.Label>
            <Form.Control
              as="select"
              name="serverity"
              value={newAlert.serverity}
              onChange={handleChange}
              required
            >
              <option value="">Select severity</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formBasicLocation">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              name="location"
              value={newAlert.location}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Caller Email</Form.Label>
            <Form.Control
              type="email"
              name="callerEmail"
              value={newAlert.callerEmail}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicResources">
            <Form.Label>Required Resources</Form.Label>
            <Form.Control
              as="select"
              multiple
              name="resourceType"
              value={newAlert.resourceType}
              onChange={handleResourceChange}
              style={{ height: "150px" }}
            >
              {resourceTypeSelection.map((resource, index) => (
                <option key={index} value={resource}>
                  {resource}
                </option>
              ))}
            </Form.Control>
            <Form.Text className="text-muted">
              Hold Ctrl/Cmd to select multiple resources
            </Form.Text>
          </Form.Group>
          <button type="submit" style={{ marginBottom: "30px" }}>
            Create Alert
          </button>

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
              Select a date to view the alerts from that day
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
                <p>
                  <strong>Resources:</strong>{" "}
                  {alert.resourceType?.join(", ") || "None"}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="back-button">
          <button onClick={toHomePage}>&larr;</button>
        </div>
      </div>
    </div>
  );
};

export default AlertsPage;
