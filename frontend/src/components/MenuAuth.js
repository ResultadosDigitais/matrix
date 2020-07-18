import React from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const MenuAuth = ({ onLogout, userName }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const { t } = useTranslation();

  return (
    <>
      <Button
        color="inherit"
        onClick={event => setAnchorEl(event.currentTarget)}
      >
        {userName}
      </Button>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        getContentAnchorEl={null}
      >
        <MenuItem
          onClick={() => {
            handleMenuClose();
            onLogout();
          }}
        >
          { t("auth:logout") }
        </MenuItem>
      </Menu>
    </>
  );
};

MenuAuth.propTypes = {
  userName: PropTypes.string,
  onLogout: PropTypes.func
};

MenuAuth.defaultProps = {
  userName: "",
  onLogout: () => {}
};

export default MenuAuth;
