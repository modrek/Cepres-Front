/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Datepicker } from "react-formik-ui";

import { NavLink, useHistory } from "react-router-dom";

import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import gate from "gate";

const validationSchema = Yup.object().shape({
  patientId: Yup.string().required(" Patient is required"),
  diseaseName: Yup.string().required("diseaseName is required"),
  bill: Yup.number().required("bill  is required"),
});

const Record = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const {
    initialValues = {
      patientId: "",
      diseaseName: "",
      timeOfEntry: "",
      bill: "",
      description: "",
    },
  } = props?.location?.state || {};

  useEffect(() => {
    fetchPatiens();
  }, []);

  const fetchPatiens = async () => {
    const patientsList = await gate
      .fetchPatients(1, 100, "", "")
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
    setData(patientsList);
  };

  const onSubmit = async (fields) => {
    if (fields.recordId == undefined) {
      const result = await gate
        .AddRecord(fields)
        .then((res) => {
          toast("Record added successfully.");
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
      const result = await gate
        .UpdateAddRecord(fields)
        .then((res) => {
          toast("Record updated successfully.");
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
    <>
      <ToastContainer></ToastContainer>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, status, touched, values, handleChange }) => {
          return (
            <Form>
              <div className="form-group">
                <label htmlFor="patientId">Patient</label>
                <Field
                  name="patientId"
                  value={values.patientId}
                  component="select"
                  className={
                    "form-control" +
                    (errors.patientId && touched.patientId ? " is-invalid" : "")
                  }
                  onChange={handleChange}
                >
                  <option value="" label="Select a patient" />
                  {data?.items?.map((patient) => {
                    return (
                      <option
                        key={patient}
                        value={patient.patientId}
                        label={patient.patientName}
                      />
                    );
                  })}
                </Field>
                <ErrorMessage
                  name="patientId"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-group">
                <label htmlFor="diseaseName">Disease Name</label>
                <Field
                  name="diseaseName"
                  type="text"
                  className={
                    "form-control" +
                    (errors.diseaseName && touched.diseaseName
                      ? " is-invalid"
                      : "")
                  }
                />
                <ErrorMessage
                  name="diseaseName"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-group">
                <label htmlFor="timeOfEntry">Time Of Entry</label>
                <Datepicker
                  className={
                    "form-control" +
                    (errors.timeOfEntry && touched.timeOfEntry
                      ? " is-invalid"
                      : "")
                  }
                  value={values?.timeOfEntry}
                  name="timeOfEntry"
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={30}
                  dateFormat="dd/MM/yyyy hh:mm aa"
                  timeCaption="time"
                />

                <ErrorMessage
                  name="timeOfEntry"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-group">
                <label htmlFor="bill">Bill (Amount)</label>
                <Field
                  name="bill"
                  type="number"
                  className={
                    "form-control" +
                    (errors.bill && touched.bill ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  name="bill"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <Field
                  name="description"
                  type="textarea"
                  className={
                    "form-control" +
                    (errors.description && touched.description
                      ? " is-invalid"
                      : "")
                  }
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="invalid-feedback"
                />
              </div>

              <div className="form-group">
                <button type="submit" className="btn btn-primary mr-2">
                  Submit
                </button>

                <NavLink className="btn btn-secondary" to="/Records">
                  Back
                </NavLink>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default Record;
