import React from "react";

export const Title = ({title}) => (
  <div className="row justify-content-center align-items-center py-4 px-2">
    <h3 className="text-center"><b>{title || "Inteligência em currículos flexiveis"}</b></h3>
  </div>
);
