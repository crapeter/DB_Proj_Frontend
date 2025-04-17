import React from "react";
import { useNavigate } from "react-router-dom";
import "../../CSS/IncidentReport.css";

const IncidentReport = () => {
  const nav = useNavigate();

  const toHomePage = () => {
    nav("/");
  };

  return (
    <div className="incident-report-container">
      <h2 className="title">Incident Report</h2>
      <form className="report-form">
        <div className="form-group">
          <label htmlFor="location" style={{ color: "white" }}>
            Location
          </label>
          <input type="text" id="location" name="location" />
        </div>
        <div className="form-group">
          <label htmlFor="category" style={{ color: "white" }}>
            Category
          </label>
          <input type="text" id="category" name="category" />
        </div>
        <div className="form-group">
          <label htmlFor="description" style={{ color: "white" }}>
            Description
          </label>
          <textarea id="description" name="description" rows="3" />
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
      <button className="back-button" onClick={toHomePage}>
        <span>&larr;</span>
      </button>
    </div>
  );
};

export default IncidentReport;
