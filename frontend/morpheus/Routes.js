import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";

import OfficePage from "./containers/OfficePage";
import OfficeSidebar from "./containers/OfficeSidebar";
import RoomPage from "./containers/RoomPage";
import RoomSidebar from "./containers/RoomSidebar";

const routesEntity = [
  {
    path: "/morpheus",
    page: OfficePage,
    sidebar: OfficeSidebar
  },
  {
    path: "/morpheus/room/:roomId",
    page: RoomPage,
    sidebar: RoomSidebar
  }
];

const Sidebar = () => (
  <Switch>
    {routesEntity.map(route => (
      <Route
        key={route.path}
        path={route.path}
        component={route.sidebar}
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

export const SidebarRouter = withRouter(Sidebar);
export default withRouter(PageRoutes);
