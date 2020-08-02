import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {style} from "react-dom-factories";
import {NavLink} from "react-router-dom";


import * as actionTypes from "store/patients/patientActionTypes";
import {selectPatient} from "store/selectors/patients";
import gate from "gate";
import Table from "./table";
import "./patient.scss";

const columns = [
  {
    Header: "Patient Name",
    accessor: "patientName",
  },
  {
    Header: "Date Of Birth",
    accessor: "dateOfBirth",
  },
  {
    Header: "Last Entry",
    accessor: "lastEntry",
  },
  {
    Header: "MetaData Count",
    accessor: "metaDataCount",
  },
];

function Patients() {
  const [params, setParams] = useState({
    sortByLocal: "patientName",
    sortDirectionLocal: "asc",
  });

  console.log({params});

  
  const dispatch = useDispatch();

  const store = useSelector(selectPatient);
  const {
    patientsList,
    pageIndex: storePageIndex,
    pageSize: storePageSize,
    sort,    
  } = store;

  useEffect(() => {
    fetch();
  }, [params]);

  const data = React.useMemo(
    () => store.data,

    [store.data]
  );

  const onSort = (params) => {
    const {id: sortBy = "patientName", desc: sortDirection = "asc"} =
      params?.["0"] || {};

   
    setParams({
      ...params,
      sortByLocal: sortBy,
      sortDirectionLocal: sortDirection,
    });
  };
  const fetch = async () => {
    const patientsList = await gate.fetchPatients(
      storePageIndex,
      storePageSize,
      params.sortByLocal,
      params.sortDirectionLocal
    );

    const payload = {
      patientsList: patientsList?.items,
      pageIndex: storePageIndex,
      pageSize: storePageSize,
      sort: sort,
      sortDirection: sort,
    };
    dispatch({type: actionTypes.START_PATIENT_FETCH, payload: payload});
  };
 
 // if (!data.length) return <h1>There is not any data</h1>;
  return (
    <div className={style.container}>
      <NavLink className="btn btn-outline-success" to="./Patients/NewForm">
        New Patients
      </NavLink>

      <NavLink className="btn btn-outline-info" to="./Patients/MetaReport">
        Meta Reports
      </NavLink>

      <div>
        <Table columns={columns} data={data} onSort={onSort} />
        
      </div>
    </div>
  );
}

export default Patients;
