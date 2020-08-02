import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import * as actionTypes from "../../store/user/userActionTypes";
import Logo from "../Logo";
import "./index.scss";

function Navbar() {
  const store = useSelector((store) => store);
  const dispatch = useDispatch();

  const userToken = store.userToken;
  
  let menuItemsobj = [{ title: "Login", url: "/Login" }];

  //if (userToken) {
  //Authenticate
  menuItemsobj = [
    { title: "Patients", url: "/Patients" },
    { title: "Records", url: "/Records" },
    //{ title: "Logout", url: "/Logout" },
  ];

  function logout() {
    localStorage.removeItem("token");
    dispatch({ type: actionTypes.START_LOGOUT });
  }
  //}

  let menuitems = menuItemsobj.map((itm, index) => {
    return (
      <li key={index} className="nav-item">
        <NavLink className="nav-link" to={itm.url} exact>
          {itm.title}
        </NavLink>
      </li>
    );
  });

  return (
    <div className="row modreknavbar">
      <div className="col-md-3 col-12">
        <Logo />
      </div>
      <div className="col-md-6 col-12 justify-content-center d-flex">
        <nav className="navbar navbar-expand">
          <ul className="navbar-nav">
            {menuitems}
            <li  className="nav-item">
              <NavLink className="nav-link " to="/Logout" exact onClick={()=>{logout()}} >
                Logout
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className="col-md-3 d-sm-none"></div>
    </div>
  );
}

export default Navbar;
