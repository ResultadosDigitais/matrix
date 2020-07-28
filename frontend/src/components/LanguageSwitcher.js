import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Tooltip from "@material-ui/core/Tooltip";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import LanguageIcon from "@material-ui/icons/Translate";
import FlagImages from "../constants/FlagImages";

const availableLanguages = [
  {
    lang: "pt-br",
    flag: FlagImages.ptBr,
  },
  {
    lang: "en",
    flag: FlagImages.en,
  }
];

const switchLanguage = (i18n, lang) => {
  i18n.changeLanguage(lang)
  localStorage.setItem("matrix-language", lang);
}

const LanguageMenuItem = ({ lang, flag }) => {
  const { t, i18n } = useTranslation();
  return (
    <MenuItem selected={i18n.language === lang} onClick={() => switchLanguage(i18n, lang)}>
      <ListItemIcon>
        <img alt="" src={flag} />
      </ListItemIcon>
      <strong>{t(`general:languages.${lang}`)}</strong>
    </MenuItem>
  );
};

LanguageMenuItem.propTypes = {
  lang: PropTypes.string,
  flag: PropTypes.string,
};

LanguageMenuItem.defaultProps = {
  lang: "",
  flag: "",
};

const LanguageSwitcher = () => {
  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
        {availableLanguages.map((language) => (
          <LanguageMenuItem
            key={language.lang}
            lang={language.lang}
            flag={language.flag}
          />
        ))}
      </Menu>
    </>
  );
};

export default LanguageSwitcher;
