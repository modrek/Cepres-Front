import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";

import Record from "../pages/records/record";
import RecordList from "../pages/records/recordsPage";

function Records() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/Records" exact component={RecordList} />
        <Route path="/Records/NewForm" component={Record} />
        <Route path="/Records/EditForm" component={Record} />
      </Switch>
    </BrowserRouter>
  );
}

export default Records;
