import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";

import Patient from "../pages/patients/patient";
import PatientList from "../pages/patients/patientsPage";
import MetaReport from "../pages/patients/reports/metaReport";
import PatientReport from "../pages/patients/reports/patientReport";

function Patients() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/Patients" exact component={PatientList} />
        <Route path="/Patients/NewForm" component={Patient} />
        <Route path="/Patients/EditForm" component={Patient} />
        <Route path="/Patients/MetaReport" component={MetaReport} />
        <Route path="/Patients/PatientReport" component={PatientReport} />
      </Switch>
    </BrowserRouter>
  );
}

export default Patients;
