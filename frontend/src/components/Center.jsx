import React from "react";

const Center = ({ children, style }) => (
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
      ...style,
    }}
  >
    {children}
  </div>
);

export default Center;
