import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useAuth } from "../Misc/AuthContext";
import "../../CSS/Register.css";

const Register = () => {
  const nav = useNavigate();
  const { setIsLoggedIn } = useAuth();

  const [formData, setFormData] = useState({
    F_Name: "",
    M_Init: "",
    L_Name: "",
    Email: "",
    Password: "",
    PasswordConfirm: "",
    Phone_Number: "",
    Home_Address: "",
    Sex: "",
    DOB: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.Password !== formData.PasswordConfirm) {
      alert("Passwords do not match!");
      return;
    }
    // API call goes here eventually

    setIsLoggedIn(true);
    toHomePage();
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
      <h2>Register</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicFName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter First Name"
            value={formData.F_Name}
            onChange={(e) =>
              setFormData({ ...formData, F_Name: e.target.value })
            }
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicMInit">
          <Form.Label>Middle Initial</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Middle Initial"
            value={formData.M_Init}
            onChange={(e) =>
              setFormData({ ...formData, M_Init: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group controlId="formBasicLName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Last Name"
            value={formData.L_Name}
            onChange={(e) =>
              setFormData({ ...formData, L_Name: e.target.value })
            }
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={formData.Email}
            onChange={(e) =>
              setFormData({ ...formData, Email: e.target.value })
            }
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={formData.Password}
            onChange={(e) =>
              setFormData({ ...formData, Password: e.target.value })
            }
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicPasswordConfirm">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={formData.PasswordConfirm}
            onChange={(e) =>
              setFormData({ ...formData, PasswordConfirm: e.target.value })
            }
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicPhoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="tel"
            placeholder="Enter Phone Number"
            value={formData.Phone_Number}
            onChange={(e) =>
              setFormData({ ...formData, Phone_Number: e.target.value })
            }
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicHomeAddress">
          <Form.Label>Home Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Home Address"
            value={formData.Home_Address}
            onChange={(e) =>
              setFormData({ ...formData, Home_Address: e.target.value })
            }
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicSex">
          <Form.Label>Sex</Form.Label>
          <Form.Select name="Sex" onChange={handleChange} required>
            <option value="">Select</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
            <option value="O">Other</option>
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="formBasicDOB">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control
            type="date"
            value={formData.DOB}
            onChange={(e) => setFormData({ ...formData, DOB: e.target.value })}
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
  );
};

export default Register;
