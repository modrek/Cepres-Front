import * as actionTypes from "./recordActionTypes";

const initialState = {
  totalPage: 1,
  pageIndex: 1,
  pageSize: 5,
  sort: "",
  sortDirection: "",
  error: false,
  loading: false,
  columnDefs: ["patientId", "recordId", "timeOfEntry", "bill", "decsription"],
  data: [],
};

const recordReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.START_RECORD_FETCH:
      const {
        pageIndex = 1,
        recordsList = [],
        sort = "",
        sortDirection = "",
      } = action.payload;

      return {...state, pageIndex, data: recordsList, sort, sortDirection};

    case actionTypes.START_RECORD_SAVE: {
      
      break;
    }

    default:
      break;
  }

  return state;
};

export default recordReducer;
