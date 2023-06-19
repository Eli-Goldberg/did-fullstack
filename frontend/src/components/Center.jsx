import React from "react";

const Center = ({ children }) => (
  <div
    style={{
      position: "absolute",
      margin: "auto",
      top: "0",
      right: "0",
      bottom: "0",
      left: "0",
      width: "200px",
      height: "200px",
    }}
  >
    {children}
  </div>
);

export default Center;
