import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Misc/AuthContext";
import axios from "axios";
import "../../CSS/IncidentReport.css";

const IncidentReport = () => {
  const nav = useNavigate();
  const [date, setDate] = useState("");
  const [incidentReports, setIncidentReports] = useState([]);
  const [defaultIncidentReports, setDefaultIncidentReports] = useState([]);
  const isLoggedIn = useAuth();

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await axios.get("/api/rti");
        const rtis = response.data.sort(
          (a, b) => new Date(b.reportTime) - new Date(a.reportTime)
        );
        setIncidentReports(rtis);
        setDefaultIncidentReports(rtis);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAlerts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toHomePage = () => {
    nav("/");
  };

  const resetDate = () => {
    setDate("");
    setIncidentReports(defaultIncidentReports);
  };

  const updateIncidentReport = async (e) => {
    e.preventDefault();

    setDate(e.target.value);
    const newDateTime = `${e.target.value}T00:00:00`;

    try {
      const response = await axios.get("/api/rti/specific/day", {
        params: {
          day: newDateTime,
        },
      });
      const rtis = response.data.sort(
        (a, b) => new Date(b.reportTime) - new Date(a.reportTime)
      );
      setIncidentReports(rtis);
    } catch (err) {
      console.error(err);
    }
  };

  if (!isLoggedIn.isLoggedIn) {
    return <div>Please log in to view this page.</div>;
  }

  return (
    <div className="incident-report-container">
      <div className="view-alerts-container">
        <div className="nav-buttons">
          <h4 className="return-button" onClick={toHomePage}>
            To Home Page
          </h4>
        </div>
        <h1 className="alerts-title">Incident Reports</h1>

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
              See incident reports for a specific day below
            </Form.Label>
            <Form.Control
              type="date"
              value={date}
              onChange={(e) => updateIncidentReport(e)}
              required
            />
          </Form.Group>
          <Button onClick={resetDate}>Reset Date</Button>
        </form>

        <div className="alert-form-container">
          <div className="alerts-list">
            {incidentReports.map((ir, index) => (
              <div key={index} className="alert-card">
                <div className="alert-header">Incident Report</div>
                <div className="alert-body">
                  <p>
                    <strong>Response Team Leader:</strong> {ir.rtTeamLeader}
                  </p>
                  <p>
                    <strong>Description:</strong> {ir.incidentReport}
                  </p>
                  <p>
                    <strong>Department:</strong> {ir.depName.replace(/_/g, " ")}
                  </p>
                  <p>
                    <strong>Alert Type:</strong> {ir.alertType}
                  </p>
                  <p>
                    <strong>Severity:</strong> {ir.severity}
                  </p>
                  <p>
                    <strong>Time of Report:</strong> {ir.reportTime}
                  </p>
                  <p>
                    <strong>Resources:</strong>{" "}
                    {ir.resources?.join(", ") || "No resources reported"}
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

export default IncidentReport;
