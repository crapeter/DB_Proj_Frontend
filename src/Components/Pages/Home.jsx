import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Modal } from "react-bootstrap";
import { ChevronRight } from "lucide-react";
import { useAuth } from "../Misc/AuthContext";
import axios from "axios";
import "../../CSS/Home.css";

const HomePage = () => {
  const nav = useNavigate();
  const { isLoggedIn, setIsLoggedIn, setUserEmail, userEmail } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [trigger, setTrigger] = useState(false);
  const [dependents, setDependents] = useState([]);
  const [addEC, setAddEC] = useState(false);
  const [dependentInfo, setDependentInfo] = useState({
    dependentEmail: "",
    fName: "",
    mInit: "",
    lName: "",
    sex: "",
    dob: "",
    relationship: "",
  });

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
  }, [isLoggedIn, userEmail, trigger]);

  const createDependent = (e) => {
    e.preventDefault();
    dependentInfo.dependentEmail = userEmail;
    const mInit = dependentInfo.mInit.substring(0, 1).toUpperCase();
    const dataToSend = {
      ...dependentInfo,
      mInit: mInit,
    };

    axios
      .post("/api/ec/create", dataToSend)
      .then((res) => {
        alert(res.data);
        setTrigger(!trigger);
        setAddEC(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteEmergencyContact = async (fName) => {
    if (dependents.length === 1) {
      alert("You must have at least one emergency contact.");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this contact?")) {
      return;
    }

    try {
      const response = await axios.delete("/api/ec", {
        params: {
          email: userEmail,
          fName: fName,
        },
      });
      alert(response.data);
      setTrigger(!trigger);
    } catch (error) {
      if (error.response) {
        console.error("Server responded with an error:", error.response.data);
      } else {
        console.error("Request failed:", error.message);
      }
    }
  };

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
              <div className="box">
                Click/Tap on Live Alerts to view and/or create an alert.
              </div>
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
              <div className="box">
                Click/Tap on Incident Reports to view past incident reports and
                their details.
              </div>
            </div>
          </div>
          <div className="section center">
            <div className="label">Your Emergency Contacts</div>
            <div className="box tall">
              {dependents.length > 0 ? (
                dependents.map((dep, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "0.5rem",
                    }}
                  >
                    <span>
                      {dep.fName} {dep.mInit}. {dep.lName}
                    </span>
                    <button
                      onClick={() => deleteEmergencyContact(dep.fName)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "red",
                      }}
                      title="Delete"
                    >
                      🗑️
                    </button>
                  </div>
                ))
              ) : (
                <div>No dependents found.</div>
              )}
            </div>
            <Button variant="light" onClick={() => setAddEC(true)}>
              ➕ Add Contact
            </Button>
          </div>

          <Modal
            show={addEC}
            onHide={() => setAddEC(false)}
            centered
            style={{ zIndex: 9999, padding: "1rem" }}
          >
            <div style={{ padding: "1rem" }}>
              <h2>Add Dependent</h2>
              <Form onSubmit={createDependent}>
                <Form.Group controlId="dependentFName" id="form-group">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter First Name"
                    value={dependentInfo.fName}
                    onChange={(e) =>
                      setDependentInfo({
                        ...dependentInfo,
                        fName: e.target.value,
                      })
                    }
                    required
                  />
                </Form.Group>

                <Form.Group controlId="dependentMInit" id="form-group">
                  <Form.Label>Middle Initial</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Middle Initial"
                    value={dependentInfo.mInit}
                    onChange={(e) =>
                      setDependentInfo({
                        ...dependentInfo,
                        mInit: e.target.value,
                      })
                    }
                  />
                </Form.Group>

                <Form.Group controlId="dependentLName" id="form-group">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Last Name"
                    value={dependentInfo.lName}
                    onChange={(e) =>
                      setDependentInfo({
                        ...dependentInfo,
                        lName: e.target.value,
                      })
                    }
                    required
                  />
                </Form.Group>

                <Form.Group controlId="dependentSex" id="form-group">
                  <Form.Label>Sex</Form.Label>
                  <Form.Select
                    value={dependentInfo.sex}
                    onChange={(e) =>
                      setDependentInfo({
                        ...dependentInfo,
                        sex: e.target.value,
                      })
                    }
                    required
                  >
                    <option value="">Select</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                    <option value="O">Other</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group controlId="dependentDOB" id="form-group">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    value={dependentInfo.dob}
                    onChange={(e) =>
                      setDependentInfo({
                        ...dependentInfo,
                        dob: e.target.value,
                      })
                    }
                    required
                  />
                </Form.Group>

                <Form.Group controlId="dependentRelationship" id="form-group">
                  <Form.Label>Relationship</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Relationship"
                    value={dependentInfo.relationship}
                    onChange={(e) =>
                      setDependentInfo({
                        ...dependentInfo,
                        relationship: e.target.value,
                      })
                    }
                    required
                  />
                </Form.Group>
                <div
                  className="modal-buttons"
                  style={{ marginTop: "1rem", textAlign: "right" }}
                >
                  <Button
                    variant="secondary"
                    onClick={() => setAddEC(false)}
                    style={{ marginRight: "0.5rem" }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={createDependent}
                  >
                    Save
                  </Button>
                </div>
              </Form>
            </div>
          </Modal>
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
