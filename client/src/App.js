import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";

//Componenets
import Navbar from "./components/Navbar";

//Pages
import home from "./pages/home";
import videocall from "./pages/videocall";
import DoctorSignin from "./pages/doctor/doctorSignin";
import DoctorSignup from "./pages/doctor/doctorSignup";
import PatientSignin from "./pages/patient/patientSignin";
import PatientSignup from "./pages/patient/patientSignup";
import DoctorDashboard from "./pages/doctor/doctorDashboard";
import PatientDashboard from "./pages/patient/patientDashboard";

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Switch>
          '
          <Route exact path="/" component={home} />
          <Route exact path="/doctor/signin" component={DoctorSignin} />
          <Route exact path="/doctor/signup" component={DoctorSignup} />
          <Route exact path="/patient/signin" component={PatientSignin} />
          <Route exact path="/patient/signup" component={PatientSignup} />
          <Route exact path="/doctor/dashboard" component={DoctorDashboard} />
          <Route exact path="/patient/dashboard" component={PatientDashboard} />
          <Route exact path="/joincall/:id" component={videocall} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
