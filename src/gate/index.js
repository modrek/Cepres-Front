import _axios from "./api";


const patient = {
  fetchPatients: async (pageIndex, pageSize, sort, sortDirection) => {
    //return patientArray ;
    const result = await _axios
      .get(
        "Patient?PageIndex=" +
          pageIndex +
          "&PageSize=" +
          pageSize +
          "&sort=" +
          sort +
          "&sortDirection=" +
          sortDirection
      )
      .catch((e) => {
        console.log("[error]", e);
      });

    return result?.data;
  },
  AddPatient: async (patientData) => await _axios.post("Patient", patientData),
  fetchPatient: async (patientId) => {
    const result = await _axios.get("Patient/" + patientId).catch((e) => {
      console.log("[error]", e);
    });

    return result?.data;
  },
  UpdatePatient: async (patientData) =>
    await _axios.put("Patient", patientData),
  
  fetchPatientReport: async (patientId) => {
    const result = await _axios
      .get("Patient/PatientReport/" + patientId)
      .catch((e) => {
        console.log("[error]", e);
      });

    return result?.data;
  },
  fetchMetaReport: async () => {
    const result = await _axios.get("Patient/MetaReport").catch((e) => {
      console.log("[error]", e);
    });

    return result?.data;
  },
};

const record = {
  fetchRecords: async (pageIndex, pageSize, sort, sortDirection) => {
    //return recordArray;
    const result = await _axios
      .get(
        "Record?PageIndex=" +
          pageIndex +
          "&PageSize=" +
          pageSize +
          "&sort=" +
          sort +
          "&sortDirection=" +
          sortDirection
      )
      .catch((e) => {
        console.log("[error]", e);
      });

    return result?.data;
  },
  AddRecord: async (recordData) => {
    const result = await _axios
      .post("Record", recordData)
      .then((response) => {
        //console.log("[OK]", response.data);
      })
      .catch((error) => {
        //console.log("[Error]", error.errors);
      });

    return result?.data;
  },
  UpdateAddRecord: async (recordData) => {
    const result = await _axios
      .put("Record", recordData)
      .then((response) => {
        //console.log("[OK]", response.data);
      })
      .catch((error) => {
        //console.log("[Error]", error.errors);
      });

    return result?.data;
  },
};

const user = {
  checkAuthentication: async (userData) => {
    //return recordArray;
    const result = await _axios.post("Users/authenticate", userData).catch((e) => {
      //console.log("[error]", e);
    });
  //console.log("[LoginResult]",result)
    return result?.data;
  },
};
export default { ...patient, ...record, ...user };
