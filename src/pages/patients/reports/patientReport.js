import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import gate from "gate";

import "./report.scss";

const PatientReport = (props) => {
  const [data, setData] = useState({});

  const {
    initialValues = {
      patientName: "",
      OfficialID: "",
      dateOfBirth: "",
      emailAddress: "",
      metaData: [{ key: "", value: "" }],
    },
  } = props?.location?.state || {};

  useEffect(() => {
    fetchPatientReport(initialValues.patientId);
  }, [initialValues.patientId]);

  const fetchPatientReport = async (patientId) => {
    const patientReportData = await gate.fetchPatientReport(patientId);
    setData(patientReportData);
  };

  return (
    <div className="reportDiv">
      <div className="form-group">
        <h2> Patient Report </h2>
      </div>
      <hr></hr>
      <div className="form-group">
        patientName : <b>{data?.patientName}</b>
      </div>
      <div className="form-group">
        age : <b>{data?.age} </b>
      </div>
      <div className="form-group">
        avarageOfBill : <b>{data?.avarageOfBill} $</b>
      </div>
      <div className="form-group">
        stdevOfBill : <b>{data?.stdevOfBill} $</b>
      </div>
      <div className="form-group">
        criticalMonth : <b>{data?.criticalMonth} </b>
      </div>
      <hr></hr>
      <div className="form-group">
        <h3>Fifth Record Entry</h3>
      </div>
      <hr></hr>
      {data?.fifthRecordEntry?.map((itm) => {
        return (
          <div className="reportItem">
            <div className="form-group">
              Disease Name : <b>{itm.diseaseName} </b>
            </div>

            <div className="form-group">
              Time of Entry : <b>{itm.timeOfEntry} </b>
            </div>
            <div className="form-group">
              Description : <b>{itm.description} </b>
            </div>
            <div className="form-group">
              Bill (Amount) : <b>{itm.bill} $</b>
            </div>
          </div>
        );
      })}
      <div className="form-group">
        <h3>Simelar Patient</h3>
      </div>
      <hr></hr>
      {data?.simelarPatient?.map((itm) => {
        return (
          <div className="reportItem">
            <div className="form-group">
              Patient Name : <b>{itm.patientName} </b>
            </div>
            <div className="form-group">
            Official ID : <b>{itm.officialID} </b>
            </div>
            <div className="form-group">
              Email Address : <b>{itm.emailAddress} $ </b>
            </div>
          </div>
        );
      })}
      <div className="form-group">
        <NavLink className="btn btn-secondary" to="/Patients">
          Back
        </NavLink>
      </div>
    </div>
  );
};

export default PatientReport;
