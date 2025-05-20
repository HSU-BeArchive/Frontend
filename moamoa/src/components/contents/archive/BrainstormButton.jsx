import React from "react";
import "./Archive.scss";

const BrainstormButton = ({ onClick }) => {
  return (
    <button className="archive-btn Brainstorm" onClick={onClick}>
      브레인 스토밍 시각화
    </button>
  );
};

export default BrainstormButton;
