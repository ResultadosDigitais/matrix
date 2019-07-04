import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import AppBarTitle from "../../components/AppBarTitle";
import MenuOffice from "../../components/MenuOffice";
import MenuAuth from "../../components/MenuAuth";
import { changeOfficeFilter } from "../store/actions";
import { selectOfficeFilter, selectCurrentUser } from "../store/selectors";

const OfficeSidebar = ({ officeFilter, currentUser, onChangeOfficeFilter }) => (
  <>
    <AppBarTitle>Matrix</AppBarTitle>
    <MenuOffice
      filter={officeFilter}
      onChangeFilter={(key, value) => {
        onChangeOfficeFilter(key, value);
      }}
    />
    <MenuAuth userName={currentUser.name} />
  </>
);

OfficeSidebar.propTypes = {
  onChangeOfficeFilter: PropTypes.func,
  officeFilter: PropTypes.object,
  currentUser: PropTypes.object
};

OfficeSidebar.defaultProps = {
  onChangeOfficeFilter: () => {},
  officeFilter: {},
  currentUser: {}
};

const mapStateToProps = state => ({
  officeFilter: selectOfficeFilter(state),
  currentUser: selectCurrentUser(state)
});

const mapDispatchToProps = {
  onChangeOfficeFilter: changeOfficeFilter
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OfficeSidebar);
