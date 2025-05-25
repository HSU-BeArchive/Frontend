import React from "react";
import "./Archive.scss";

const UploadButton = ({ onClick, isActive }) => {
  return (
    <button
      className={`archive-btn Upload ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      레퍼런스 업로드
    </button>
  );
};

export default UploadButton;
