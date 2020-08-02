import {combineReducers} from "redux";
import {applyMiddleware, createStore} from "redux";
import logger from "redux-logger";

import patient from "./patients/patientReducer";
import record from "./records/recordReducer";
import user from "./user/userReducer";

const rootReducers = combineReducers({
  patient,
  record,
  user,
});

const store = createStore(rootReducers, applyMiddleware(logger));
//const store = createStore(rootReducers);
export default store;
