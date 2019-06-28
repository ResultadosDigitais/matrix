import React from "react";
import PropTypes from "prop-types";
import Checkbox from "@material-ui/core/Checkbox";
import SupervisedUserCircle from "@material-ui/icons/SupervisedUserCircle";

const MenuOffice = ({ filter, onChangeFilter }) => (
  <Checkbox
    icon={<SupervisedUserCircle />}
    checkedIcon={<SupervisedUserCircle />}
    checked={filter.onlyFullRoom}
    onChange={event => {
      onChangeFilter("onlyFullRoom", event.target.checked);
    }}
  />
);

MenuOffice.propTypes = {
  filter: PropTypes.object.isRequired,
  onChangeFilter: PropTypes.func.isRequired
};

export default MenuOffice;
