import React from "react";
import "./Archive.scss";

const UploadButton = ({ onClick }) => {
  return (
    <button className="archive-btn Upload" onClick={onClick}>
      레퍼런스 업로드
    </button>
  );
};

export default UploadButton;
