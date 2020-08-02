import React from "react";
import "./App.scss";
import Layout from "./components/layout";
import Login from "./pages/accounts/login";
import Records from "./routes/records";
import Patients from "./routes/patients";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const store = useSelector((store) => store);

  let userToken = store.userToken;

  if (!userToken) {
    userToken = localStorage.getItem("token");
  }

  let content = <Route path="/" component={Login} />;

  if (userToken)
    content = (
      <>        
        <Route path="/Patients" component={Patients} />
        <Route path="/Records" component={Records} />
      </>
    );

  return (
    <div className="app-container">
      <div className="App">
        <div className="container-full ">
          <BrowserRouter>
            <Layout />
            <div className="d-flex p-2 ">
              <div className="mainbody col-12 d-flex justify-content-center">
                <Switch>{content}</Switch>
              </div>
            </div>
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
}

export default App;
