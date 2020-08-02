import * as actionTypes from "./patientActionTypes";

const initialState = {
  totalPage: 1,
  pageIndex: 1,
  pageSize: 5,
  sort: "",
  sortDirection: "",
  error: false,
  loading: false,
  columnDefs: [
    "patientId",
    "patientName",
    "officialID",
    "dateOfBirth",
    "emailAddress",
  ],
  data: [],
};

const patientReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.START_PATIENT_FETCH:
      const {
        pageIndex = 1,
        patientsList = [],
        sort = "",
        sortDirection = "",
      } = action.payload;

      return { ...state, pageIndex, data: patientsList, sort, sortDirection };

    case actionTypes.START_PATIENT_SAVE: {
      
      break;
    }

    default:
      break;
  }

  return state;
};

export default patientReducer;
