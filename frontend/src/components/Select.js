import React from "react";
import PropTypes from "prop-types";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MuiSelect from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const Select = ({ onChange, label, value, options }) => (
  <FormControl fullWidth>
    <InputLabel shrink>{label}</InputLabel>
    <MuiSelect
      value={value}
      onChange={onChange}
      inputProps={{
        name: "age",
        id: "age-native-label-placeholder"
      }}
    >
      {options &&
        options.map(item => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
    </MuiSelect>
  </FormControl>
);

Select.propTypes = {
  onChange: PropTypes.func,
  label: PropTypes.string,
  value: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string
    })
  )
};

Select.defaultProps = {
  onChange: undefined,
  label: undefined,
  value: undefined,
  options: []
};

export default Select;
