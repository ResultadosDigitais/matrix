import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Tooltip from "@material-ui/core/Tooltip";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import LanguageIcon from "@material-ui/icons/Translate";
import FlagImages from "../constants/FlagImages";

const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const switchLanguage = (lang) => {
    i18n.changeLanguage(lang)
    localStorage.setItem("matrix-language", lang);
    handleClose();
  }

  return (
    <>
      <Tooltip title={t("general:change-language")}>
        <IconButton
          aria-controls="language-menu"
          aria-haspopup="true"
          onClick={ handleClick }
        >
          <LanguageIcon />
        </IconButton>
      </Tooltip>
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <MenuItem selected={i18n.language === "en"} onClick={() => switchLanguage("en")}>
          <ListItemIcon>
            <img alt="" src={FlagImages.en} />
          </ListItemIcon>
          <strong>{t("general:languages.en")}</strong>
        </MenuItem>
        <MenuItem selected={i18n.language === "pt-BR"} onClick={() => switchLanguage("pt-BR")}>
          <ListItemIcon>
            <img alt="" src={FlagImages.ptBr} />
          </ListItemIcon>
          <strong>{t("general:languages.pt-br")}</strong>
        </MenuItem>
      </Menu>
    </>
  );
};

export default LanguageSwitcher;
