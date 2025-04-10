import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./Components/Misc/AuthContext";

// Components
import DispatchPanel from "./Components/Pages/DispatchPanel";
import Home from "./Components/Pages/Home";
import IncidentReport from "./Components/Pages/IncidentReport.jsx";
import Login from "./Components/Pages/Login";
import Register from "./Components/Pages/Register";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" Component={Home} />
          <Route exact path="/Dispatch_Panel" Component={DispatchPanel} />
          <Route exact path="/Incident_Reports" Component={IncidentReport} />
          <Route exact path="/Login" Component={Login} />
          <Route exact path="/Register" Component={Register} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
