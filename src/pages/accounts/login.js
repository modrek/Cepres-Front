import React, {  useState } from "react";
import { useDispatch } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";


import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import * as actionTypes from "../../store/user/userActionTypes";
import "./login.scss";


import gate from "gate";

const validationSchema = Yup.object().shape({
  username: Yup.string().required(" User name is required"),
  password: Yup.string().required("Password is required"),
});

const Login = (props) => {
  
  const dispatch = useDispatch();

  const [data] = useState({});

  const {
    initialValues = {
      username: "",
      password: "",
    },
  } = props?.location?.state || {};

  return (
    <div className="loginForm">
      <ToastContainer></ToastContainer>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (fields) => {
          const result = await gate
            .checkAuthentication(fields)
            .catch((error) => {
              toast("Login failed. Please try again.");
            });
          if (!result) toast("Login failed. Please try again.");
          else {      
            console.log("[dispatch]");                              
            dispatch({type: actionTypes.START_LOGIN, payload: result});
          }
        }}
      >
        {({ errors, status, touched, values }) => {
          //console.log({ errors });
          //console.log({ values });
          return (
            <Form>
              <div className="form-group">
                <label htmlFor="username">User Name</label>
                <Field
                  value={data?.username}
                  name="username"
                  type="text"
                  className={
                    "form-control" +
                    (errors.username && touched.username ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Pasword</label>
                <Field
                  value={data?.password}
                  name="password"
                  type="password"
                  className={
                    "form-control" +
                    (errors.password && touched.password ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary mr-2">
                  Login
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Login;
