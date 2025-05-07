import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useAuth } from "../Misc/AuthContext";
import axios from "axios";
import "../../CSS/Register.css";

const Register = () => {
  const nav = useNavigate();
  const { setUserEmail } = useAuth();
  const [isRegistered, setIsRegistered] = useState(false);

  const [formData, setFormData] = useState({
    fName: "",
    mInit: "",
    lName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    phoneNum: "",
    homeAddr: "",
    sex: "",
    dob: "",
  });

  const [dependentInfo, setDependentInfo] = useState({
    dependentEmail: "",
    fName: "",
    mInit: "",
    lName: "",
    sex: "",
    dob: "",
    relationship: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.passwordConfirm) {
      alert("Passwords do not match!");
      return;
    }

    const mInit = formData.mInit.substring(0, 1).toUpperCase();

    const dataToSend = {
      ...formData,
      mInit: mInit,
    };
    delete dataToSend.passwordConfirm;

    axios
      .post("/api/users/register", dataToSend)
      .then((res) => {
        setUserEmail(formData.email);
        setIsRegistered(true);
        alert(res.data);
        console.log(JSON.stringify(dataToSend));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createDependent = (e) => {
    e.preventDefault();
    dependentInfo.dependentEmail = formData.email;
    const mInit = dependentInfo.mInit.substring(0, 1).toUpperCase();
    const dataToSend = {
      ...dependentInfo,
      mInit: mInit,
    };

    axios
      .post("/api/ec/create", dataToSend)
      .then((res) => {
        alert(res.data);
        toHomePage();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toHomePage = () => {
    nav("/");
  };

  return (
    <div className="register-page">
      {!isRegistered ? (
        <div className="register-container">
          <h2>Register</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicFName" id="form-group">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter First Name"
                value={formData.fName}
                onChange={(e) =>
                  setFormData({ ...formData, fName: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicMInit" id="form-group">
              <Form.Label>Middle Initial</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Middle Initial"
                value={formData.mInit}
                onChange={(e) =>
                  setFormData({ ...formData, mInit: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="formBasicLName" id="form-group">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Last Name"
                value={formData.lName}
                onChange={(e) =>
                  setFormData({ ...formData, lName: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail" id="form-group">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" id="form-group">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPasswordConfirm" id="form-group">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={formData.passwordConfirm}
                onChange={(e) =>
                  setFormData({ ...formData, passwordConfirm: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPhoneNumber" id="form-group">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter Phone Number"
                value={formData.phoneNum}
                onChange={(e) =>
                  setFormData({ ...formData, phoneNum: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicHomeAddress" id="form-group">
              <Form.Label>Home Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Home Address"
                value={formData.homeAddr}
                onChange={(e) =>
                  setFormData({ ...formData, homeAddr: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicSex" id="form-group">
              <Form.Label>Sex</Form.Label>
              <Form.Select name="Sex" onChange={handleChange} required>
                <option value="">Select</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Other</option>
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="formBasicDOB" id="form-group">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                value={formData.dob}
                onChange={(e) =>
                  setFormData({ ...formData, dob: e.target.value })
                }
                required
              />
            </Form.Group>

            <div>
              <Button variant="primary" type="submit">
                Submit
              </Button>
              <Button variant="link" onClick={toHomePage}>
                Back to Home
              </Button>
            </div>
          </Form>
        </div>
      ) : (
        <div className="dependent-container">
          <h2>Add Dependent</h2>
          <Form onSubmit={createDependent}>
            <Form.Group controlId="dependentFName" id="form-group">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter First Name"
                value={dependentInfo.fName}
                onChange={(e) =>
                  setDependentInfo({ ...dependentInfo, fName: e.target.value })
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
                  setDependentInfo({ ...dependentInfo, mInit: e.target.value })
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
                  setDependentInfo({ ...dependentInfo, lName: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group controlId="dependentSex" id="form-group">
              <Form.Label>Sex</Form.Label>
              <Form.Select
                value={dependentInfo.sex}
                onChange={(e) =>
                  setDependentInfo({ ...dependentInfo, sex: e.target.value })
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
                  setDependentInfo({ ...dependentInfo, dob: e.target.value })
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

            <div>
              <Button variant="primary" type="submit">
                Add Dependent
              </Button>
              <Button variant="link" onClick={toHomePage}>
                Finish & Go Home
              </Button>
            </div>
          </Form>
        </div>
      )}
    </div>
  );
};

export default Register;
