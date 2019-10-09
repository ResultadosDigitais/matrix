import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ConfirmDialog from "../../components/ConfirmDialog";
import { closeLogoutConfirmDialog } from "../store/actions";
import { selectIsLogoutDialogOpen } from "../store/selectors";
import { signOut } from "../socket";

const ConfirmLogoutDialog = ({ onClose, isOpen }) => (
  <ConfirmDialog
    title="Logout"
    message="Do you really want to unplug from the matrix?"
    open={isOpen}
    onClose={onClose}
    onConfirm={signOut}
  />
);

ConfirmLogoutDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isOpen: selectIsLogoutDialogOpen(state)
});

const mapDispatchToProps = {
  onClose: closeLogoutConfirmDialog
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmLogoutDialog);
