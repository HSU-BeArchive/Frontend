import React from 'react'
import emptyIcon from "../../../assets/images/empty-archive.svg";

const EmptyBoard = () => {
  return (
    <div>
      <div className="empty-board">
        <img src={emptyIcon} alt="empty" />
      </div>
    </div>
  );
}

export default EmptyBoard;
