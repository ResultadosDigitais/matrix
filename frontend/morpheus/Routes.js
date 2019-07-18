import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";

import OfficePage from "./containers/OfficePage";
import OfficeAppBar from "./containers/OfficeAppBar";
import OfficeRedirect from "./containers/OfficeRedirect";
import RoomPage from "./containers/RoomPage";
import RoomAppBar from "./containers/RoomAppBar";
import PageNoFound from "./containers/PageNotFound";

const routesEntity = [
  {
    path: "/morpheus",
    page: OfficeRedirect
  },
  {
    path: "/morpheus/office/:roomId",
    page: OfficePage,
    appBar: OfficeAppBar
  },
  {
    path: "/morpheus/room/:roomId",
    page: RoomPage,
    appBar: RoomAppBar
  }
];

const AppBar = () => (
  <Switch>
    {routesEntity.map(route => (
      <Route
        key={route.path}
        path={route.path}
        component={route.appBar}
        exact
      />
    ))}
  </Switch>
);

const PageRoutes = () => (
  <Switch>
    {routesEntity.map(route => (
      <Route key={route.path} path={route.path} component={route.page} exact />
    ))}
    <Route component={PageNoFound} />
  </Switch>
);

export const AppBarRouter = withRouter(AppBar);
export default withRouter(PageRoutes);
