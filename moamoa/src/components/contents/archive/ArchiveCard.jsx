import React from "react";
import "./archive.scss";

const ArchiveCard = ({ name, onDelete }) => {
  return (
    <div className="archive-card">
      <div className="card-thumbnail">
        <button className="delete-button" onClick={onDelete}>
          ×
        </button>
      </div>
      <div className="card-name">{name}</div>
    </div>
  );
};

export default ArchiveCard;
