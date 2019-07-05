import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";

import OfficePage from "./containers/OfficePage";
import OfficeAppBar from "./containers/OfficeAppBar";
import RoomPage from "./containers/RoomPage";
import RoomAppBar from "./containers/RoomAppBar";

const routesEntity = [
  {
    path: "/morpheus",
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
  </Switch>
);

export const AppBarRouter = withRouter(AppBar);
export default withRouter(PageRoutes);
