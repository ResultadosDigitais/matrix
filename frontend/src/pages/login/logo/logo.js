import React from "react";

export const Logo = ({ src }) => (
  <div className="row justify-content-center align-items-center">
    <img src={src || "/images/BloxLogo.svg"} alt="blox-logo"/>
  </div>
);
