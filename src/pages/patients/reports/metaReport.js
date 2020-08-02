import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import gate from "gate";
import "./report.scss";


const MetaReport = (props) => {
  const [data, setData] = useState({});

  useEffect(() => {
    fetchMetaReport();
  }, []);

  const fetchMetaReport = async () => {
    const patientMetaReport = await gate.fetchMetaReport();
    setData(patientMetaReport);
  };

  return (
    <div className="reportDiv">
      <div className="form-group">
        <h2>Meta Report</h2>
      </div>

      <hr></hr>
      <div className="form-group">
        Avarage of metadata for patient :<b> {data?.average}</b>
      </div>

      <div className="form-group">
        Max of metadata per patient :<b> {data?.max} </b>
      </div>

      
      <hr></hr>
      <div className="form-group">
        <h3>Top 3 Highest keys</h3>
      </div>
      <hr></hr>
      {data?.top3Highestkeys?.map((itm) => {
        return (
          <div className="reportItem">
            <div>
              Key : <b>{itm.key}</b>
            </div>
            <div>
              Count : <b>{itm.count}</b>
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

export default MetaReport;
