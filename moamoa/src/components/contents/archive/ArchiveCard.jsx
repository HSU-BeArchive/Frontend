import React from "react";
import { RxCross2 } from "react-icons/rx";
import "./Archive.scss";

const ArchiveCard = ({ name, image, onDelete, onClick }) => {
  return (
    <div className="archive-card" onClick={onClick}>
      <div className="card-thumbnail">
        <img src={image} alt={name} />
        <button
          className="delete-button"
          onClick={(e) => {
            e.stopPropagation(); // 카드 onClick 이벤트 무시
            onDelete();
          }}
        >
          <RxCross2 size="100%" />
        </button>
      </div>
      <div className="card-name">{name}</div>
    </div>
  );
};

export default ArchiveCard;
