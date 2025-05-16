import React from "react";
import "./FolderList.scss";
import { FaPlus } from "react-icons/fa6";

const FolderList = () => {
  return (
    <div className="folder-list">
      <div className="folder-list__header">
        <span className="folder-list__title">폴더</span>
        <FaPlus className="folder-list__add-button" />
      </div>
    </div>
  );
};

export default FolderList;
