import React, { Component } from "react";
import PropTypes from "prop-types";

import Dropdown from "bootstrap/js/dist/dropdown";

import styles from "./header.module.css";

export class Header extends Component {
  constructor(props) {
    super(props);
    this.dropdownRef = React.createRef();
  }

  componentDidMount() {
    const dropdownEl = this.dropdownRef.current;

    new Dropdown(dropdownEl);
  }

  render() {
    const { name } = this.props;

    return (
      <nav className={`navbar ${styles["navbar-custom"]}`}>
        <span className="navbar-brand">
          <img src="/images/logo_min.svg" alt="Matrix" />
        </span>
        <div className="dropdown" ref={this.dropdownRef}>
          <a href="#" className="dropdown-toggle" role="button">
            Whats'up {name}
          </a>
          <div
            className={`dropdown-menu dropdown-menu-right ${
              styles["dropdown-menu"]
            }`}
            aria-labelledby="userName"
          >
            <button type="button" className="logoutBtn">
              Logout
            </button>
          </div>
        </div>
      </nav>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired
};
