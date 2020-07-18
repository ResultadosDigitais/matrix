import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import Checkbox from "@material-ui/core/Checkbox";
import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects";
import Tooltip from "@material-ui/core/Tooltip";

function ThemeCheckbox({ onChange }) {
  const { t } = useTranslation();

  return (
    <Tooltip
      title={t("general:toggle-theme")}
    >
      <Checkbox
        icon={<EmojiObjectsIcon />}
        checkedIcon={<EmojiObjectsIcon />}
        checked={false}
        onChange={onChange}
      />
    </Tooltip>
  );
}

ThemeCheckbox.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default ThemeCheckbox;
