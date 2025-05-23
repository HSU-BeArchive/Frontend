import React from "react";
import { RxCross2 } from "react-icons/rx";
import "./Archive.scss";

const ArchiveCard = ({ name, image, onDelete }) => {
  return (
    <div className="archive-card">
      <div className="card-thumbnail">
        <img src={image} alt={name} />
        <button className="delete-button" onClick={onDelete}>
          <RxCross2 size="100%" />
        </button>
      </div>
      <div className="card-name">{name}</div>
    </div>
  );
};

export default ArchiveCard;
