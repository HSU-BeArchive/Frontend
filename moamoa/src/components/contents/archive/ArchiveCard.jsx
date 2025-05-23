import React from "react";
import { RxCross2 } from "react-icons/rx";
import "./Archive.scss";

const ArchiveCard = ({ name, onDelete, previewUrl }) => {
  return (
    <div className="archive-card">
      <div className="card-thumbnail">
        {previewUrl && (<img src={previewUrl} alt="preview"/>)}
        <button className="delete-button" onClick={onDelete}>
          <RxCross2 size="100%" />
        </button>
      </div>
      <div className="card-name">{name}</div>
    </div>
  );
};

export default ArchiveCard;
