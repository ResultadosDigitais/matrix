import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectRooms } from '../morpheus/store/selectors';
import Select from './Select';

const formatOption = (id, label) => ({
  value: `${id}`,
  label: `${label}`
});

const SelectRooms = ({rooms, label, value, onChange, className}) => {
  const getRoomOptions = () =>
    rooms.map(room => formatOption(room.id, room.name));

  return (
    <Select
      label={label}
      options={getRoomOptions()}
      value={value}
      onChange={onChange}
      className={className}
    />
  );
};


SelectRooms.propTypes = {
    rooms: PropTypes.arrayOf(PropTypes.object).isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string.isRequired
  };
  
  SelectRooms.defaultProps = {
    rooms: [],
    label: '',
    value: '',
    onChange: undefined,
    className: ''
  };
  

const mapStateToProps = state => ({
  rooms: selectRooms(state)
});

export default connect(mapStateToProps)(SelectRooms);
