import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import AppBarTitle from "../../components/AppBarTitle";
import MenuOffice from "../../components/MenuOffice";
import MenuAuth from "../../components/MenuAuth";
import { changeOfficeFilter, changeSettings } from "../store/actions";
import {
  selectOfficeFilter,
  selectCurrentUser,
  selectSettings
} from "../store/selectors";
import {
  OfficeFilterPropType,
  SettingsPropType,
  CurrentUserPropType
} from "../store/models";

const OfficeAppBar = ({
  onChangeOfficeFilter,
  onChangeSettings,
  officeFilter,
  settings,
  currentUser
}) => (
  <>
    <AppBarTitle>Matrix</AppBarTitle>
    <MenuOffice
      filter={officeFilter}
      onChangeFilter={onChangeOfficeFilter}
      onChangeSettings={onChangeSettings}
      settings={settings}
    />
    <MenuAuth userName={currentUser.name} />
  </>
);

OfficeAppBar.propTypes = {
  onChangeOfficeFilter: PropTypes.func,
  onChangeSettings: PropTypes.func,
  officeFilter: OfficeFilterPropType,
  settings: SettingsPropType,
  currentUser: CurrentUserPropType
};

OfficeAppBar.defaultProps = {
  onChangeOfficeFilter: () => {},
  onChangeSettings: () => {},
  officeFilter: {},
  settings: {},
  currentUser: {}
};

const mapStateToProps = state => ({
  officeFilter: selectOfficeFilter(state),
  currentUser: selectCurrentUser(state),
  settings: selectSettings(state)
});

const mapDispatchToProps = {
  onChangeOfficeFilter: changeOfficeFilter,
  onChangeSettings: changeSettings
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OfficeAppBar);
