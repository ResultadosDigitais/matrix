import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";

import MorpheusOffice from "./pages/MorpheusOffice";
import MorpheusRoom from "./pages/MorpheusRoom";

const Routes = () => (
  <Switch>
    <Route path="/morpheus" exact component={MorpheusOffice} />
    <Route path="/morpheus/office" exact component={MorpheusRoom} />
  </Switch>
);

export default withRouter(Routes);
