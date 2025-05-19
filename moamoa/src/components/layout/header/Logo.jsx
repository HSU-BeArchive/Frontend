import React from "react";

const Logo = ({ width, height, src }) => {
  return <img src={src} alt="Logo" style={{ width, height }} />;
};

export default Logo;
