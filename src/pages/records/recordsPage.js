/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {style} from "react-dom-factories";
import {NavLink} from "react-router-dom";

import * as actionTypes from "store/records/recordActionTypes";
import gate from "gate";
import {selectRecord} from "store/selectors/records";

import Table from "./table";



function Records() {
  

  const store = useSelector(selectRecord);
  const {    
    pageIndex: storePageIndex,
    pageSize: storePageSize,    
  } = store;
  const dispatch = useDispatch();
  const data = React.useMemo(() => store.data, [store.data]);
  const columns = React.useMemo(
    () => [
    
      {
        Header: "Patient",
        accessor: "patientName",
      },
      {
        Header: "Disease Name",
        accessor: "diseaseName",
      },
      {
        Header: "Time Of Entry",
        accessor: "timeOfEntry",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Bill (Amount)",
        accessor: "bill",
      },
    ],
    []
  );

  const fetch = async () => {
    //console.log("Call Fetch");
    const recordsList = await gate.fetchRecords(
      store.pageIndex,
      store.pageSize,
      store.sort,
      store.sortDirection
    );
    const payload = {
      recordsList: recordsList?.items,
      pageIndex: storePageIndex,
      pageSize: storePageSize,
      sort: store.sort,
      sortDirection: store.sortDirection,
    };
    dispatch({type: actionTypes.START_RECORD_FETCH, payload: payload});
  };

  useEffect(() => {
    fetch();
  }, [storePageSize, storePageIndex]);

 
  return (
    <div className={style.container}>
      <NavLink className="btn btn-outline-success" to="./Records/NewForm">
        New Record
      </NavLink>

      <div>
        <Table
          columns={columns}
          data={data}
          onSort={() => {
            // alert("on Sort");
          }}
        />
      </div>
    </div>
  );
}

export default Records;
