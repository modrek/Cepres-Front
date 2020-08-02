import * as actionTypes from "./userActionTypes";

const initialState = {
  userId: "",
  userToken: "",
  userName: "",
  firstName: "",
  lastName: "",
  userPic: "",
  exprieDate: "",  
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.START_LOGIN: {      
//      console.log("[[]]",action.payload)
      state = { ...state };
      state.userId = action.payload.userId;
      state.token=action.payload.token;
      state.userName=action.payload.userName;
      state.firstName=action.payload.firstName;
      state.lastName=action.payload.lastName;            
      localStorage.setItem("token", action.payload.token);
                
      break;
    }
    case actionTypes.START_LOGOUT: {
      state = { ...state };
      state.userId = "";
      state.userToken="";
      state.userName="";
      state.firstName="";
      state.lastName="";            
      
      break;
    }

    default:
      break;
  }

  return state;

 
};

export default userReducer;
