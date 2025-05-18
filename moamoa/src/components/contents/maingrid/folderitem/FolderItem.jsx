import React from "react";
import "./FolderItem.scss";
import EMPTYFOLDER from "../../../../assets/images/folder-empty.svg";
import FULLFOLDER from "../../../../assets/images/folder-full.svg";

const FolderItem = ({ name, isEmpty }) => {
  return (
    <div className="folder">
      <img src={isEmpty ? EMPTYFOLDER : FULLFOLDER} alt={name} />
      <span>{name}</span>
    </div>
  );
};

export default FolderItem;
