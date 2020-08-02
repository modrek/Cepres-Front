import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import { Formik, FieldArray, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import "react-toastify/dist/ReactToastify.css";
import "./patient.scss";
import gate from "gate";

const validationSchema = Yup.object().shape({
  patientName: Yup.string().required(" Name is required"),
  officialID: Yup.number().required("Official ID is required"),
  dateOfBirth: Yup.string().required("BirthDate is required"),
  emailAddress: Yup.string().email().required("email  is required"),
  metaData: Yup.array().of(
    Yup.object().shape({
      key: Yup.string().required("key is required"),
      value: Yup.string().required("value is required"),
    })
  ),
});
const Patient = (props) => {
  const [data, setData] = useState({
    patientName: "",
    officialID: "",
    dateOfBirth: "",
    emailAddress: "",
    metaData: [],
    ...props?.location?.state,
  });

  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const isEditFormType = props?.location?.state?.initialValues?.patientId;
  const { patientId } = props?.location?.state?.initialValues || {};

  useEffect(() => {
    if (!isEditFormType) {
      setLoading(false);
      return;
    }

    fetchPatientData(patientId);
  }, [patientId, isEditFormType]);

  const fetchPatientData = async (patientId) => {
    setLoading(true);
    const patientData = await gate
      .fetchPatient(patientId)
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
    console.log({ patientData });
    setData(patientData);
  };

  const onSubmit = async (fields) => {
    if (!data?.patientId) {
      await gate
        .AddPatient(fields)
        .then((res) => {
          toast("Patient added successfully.");
          setTimeout(() => {
            history.goBack();
          }, 1000);
        })
        .catch((error) => {
          toast(
            error?.response?.data?.errors[
              Object.keys(error?.response?.data?.errors)[0]
            ]?.[0]
          );
        });
    } else {
      await gate
        .UpdatePatient(fields)
        .then((res) => {
          toast("Patient updated successfully.");
          setTimeout(() => {
            history.goBack();
          }, 1000);
        })
        .catch((error) => {
          toast(
            error?.response?.data?.errors[
              Object.keys(error?.response?.data?.errors)[0]
            ]?.[0]
          );
        });
    }
  };
  if (loading) return <h4>Loading ...</h4>;
  return (
    <div>
      <ToastContainer></ToastContainer>
      <Formik
        enableReinitialize
        initialValues={data}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, status, touched, values }) => {
          return (
            <Form>
              <div className="form-group">
                <label htmlFor="patientName">First Name</label>
                <Field
                  value={values?.patientName}
                  name="patientName"
                  type="text"
                  className={
                    "form-control" +
                    (errors.patientName && touched.patientName
                      ? " is-invalid"
                      : "")
                  }
                />
                <ErrorMessage
                  name="patientName"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-group">
                <label htmlFor="officialID">Official ID</label>
                <Field
                  value={values?.officialID}
                  name="officialID"
                  type="number"
                  className={
                    "form-control" +
                    (errors.officialID && touched.officialID
                      ? " is-invalid"
                      : "")
                  }
                />
                <ErrorMessage
                  name="officialID"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-group">
                <label htmlFor="dateOfBirth">BirthDate</label>

                <Field
                  value={values?.dateOfBirth?.split("T")[0]}
                  name="dateOfBirth"
                  type="date"
                  className={
                    "form-control" +
                    (errors.dateOfBirth && touched.dateOfBirth
                      ? " is-invalid"
                      : "")
                  }
                />
                <ErrorMessage
                  name="dateOfBirth"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-group">
                <label htmlFor="emailAddress">Email</label>
                <Field
                  value={values?.emailAddress}
                  name="emailAddress"
                  type="emailAddress"
                  className={
                    "form-control" +
                    (errors.emailAddress && touched.emailAddress
                      ? " is-invalid"
                      : "")
                  }
                />
                <ErrorMessage
                  name="emailAddress"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <FieldArray
                name="metaData"
                render={(arrayHelpers) => {
                  const metaData = values?.metaData;

                  return (
                    <div>
                      {metaData && metaData.length > 0
                        ? metaData.map((metadataItem, index) => (
                            <div key={index} className="meta-data__item">
                              <button
                                type="button"
                                className="btn btn-danger meta-data__item-delete"
                                onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                              >
                                x
                              </button>

                              <Field
                                value={metadataItem.key}
                                className="form-control"
                                placeholder="key"
                                name={`metaData.${index}.key`}
                              />
                              <ErrorMessage name={`metaData.${index}.key`} />
                              <br />

                              <Field
                                value={metadataItem.value}
                                className="form-control"
                                placeholder="value"
                                name={`metaData.${index}.value`}
                              />
                              <ErrorMessage name={`metaData.${index}.value`} />
                            </div>
                          ))
                        : null}
                      <button
                        className="btn btn-success"
                        type="button"
                        onClick={() =>
                          arrayHelpers.push({
                            key: "",
                            value: "",
                          })
                        }
                      >
                        +
                      </button>
                    </div>
                  );
                }}
              />

              <div className="form-group">
                <button type="submit" className="btn btn-primary mr-2">
                  Submit
                </button>
                <NavLink className="btn btn-secondary" to="/Patients">
                  Back
                </NavLink>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Patient;
