import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Misc/AuthContext";
import axios from "axios";
import "../../CSS/Alerts.css";

const AlertsPage = () => {
  const nav = useNavigate();
  const isLoggedIn = useAuth();
  const userEmail = useAuth();
  const [alerts, setAlerts] = useState([]);
  const [newAlert, setNewAlert] = useState({
    alertType: "",
    severity: "",
    location: "",
    callerEmail: userEmail.userEmail,
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
    setResourceTypeSelection(emergencyEquipment);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    setNewAlert({ ...newAlert, [e.target.name]: e.target.value });
  };

  const createAlert = (e) => {
    e.preventDefault();
    axios
      .post("/api/alerts/create", newAlert)
      .then((res) => {
        alert(res.data);
        setNewAlert({
          alertType: "",
          severity: "",
          location: "",
          callerEmail: userEmail.userEmail,
          resourceType: [],
        });
      })
      .catch((err) => {
        console.log(err);
      });
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
        severity: "",
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

  const toViewAlerts = () => {
    nav("/Alerts");
  };

  if (!isLoggedIn.isLoggedIn) {
    return <div>Please log in to view this page.</div>;
  }

  return (
    <div className="alerts-container">
      <div className="create-alerts-container">
        <div className="nav-buttons">
          <h4 className="return-button" onClick={toHomePage}>
            To Home Page
          </h4>
          <h3 className="return-button" onClick={toViewAlerts}>
            View Alerts
          </h3>
        </div>
        <h1 className="alerts-title">Create Alert</h1>
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
                name="severity"
                value={newAlert.severity}
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

            <Form.Group controlId="formBasicResources">
              <Form.Label>Required Resources</Form.Label>
              <div
                style={{
                  maxHeight: "150px",
                  overflowY: "auto",
                  border: "1px solid #ced4da",
                  padding: "0.5rem",
                  borderRadius: "4px",
                }}
              >
                {resourceTypeSelection.map((resource, index) => (
                  <Form.Check
                    className="resource-checkbox"
                    key={index}
                    type="checkbox"
                    label={resource}
                    value={resource}
                    checked={newAlert.resourceType.includes(resource)}
                    onChange={(e) => {
                      const selected = [...newAlert.resourceType];
                      if (e.target.checked) {
                        selected.push(resource);
                      } else {
                        const idx = selected.indexOf(resource);
                        if (idx !== -1) selected.splice(idx, 1);
                      }
                      setNewAlert({
                        ...newAlert,
                        resourceType: selected,
                      });
                    }}
                  />
                ))}
              </div>
              <Form.Text className="text-muted">
                Select all that apply
              </Form.Text>
            </Form.Group>
            <button type="submit" onClick={createAlert}>
              Create Alert
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AlertsPage;
