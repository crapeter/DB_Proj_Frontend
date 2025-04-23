import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./Components/Misc/AuthContext";

// Components
import Home from "./Components/Pages/Home";
import IncidentReport from "./Components/Pages/IncidentReport.jsx";
import Alerts from "./Components/Pages/Alerts";
import ViewAlerts from "./Components/Pages/ViewAlerts";
import Register from "./Components/Pages/Register";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" Component={Home} />
          <Route exact path="/Incident_Reports" Component={IncidentReport} />
          <Route exact path="/Create_Alert" Component={Alerts} />
          <Route exact path="/Alerts" Component={ViewAlerts} />
          <Route exact path="/Register" Component={Register} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
