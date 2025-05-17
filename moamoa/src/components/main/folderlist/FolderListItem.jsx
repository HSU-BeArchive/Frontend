import React, { useState } from "react";
import { FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import "./FolderList.scss";
import { GoPencil } from "react-icons/go";
import { IoCheckmark, IoCloseOutline } from "react-icons/io5";

const FolderListItem = ({
  name,
  isEditing,
  onStartEdit,
  onStopEdit,
  onRequestDelete,
  folderNames,
}) => {
  const [inputValue, setInputValue] = useState(name); // 입력 이름
  const [originalValue, setOriginalValue] = useState(name); // 원래 이름

  const isModified = inputValue !== originalValue; // 수정 여부
  const isDuplicate =
    inputValue.trim() !== originalValue &&
    folderNames.includes(inputValue.trim()); // 중복 여부

  // 이름 수정
  const handleSave = () => {
    // 중복되거나 비어있는 경우
    if (isDuplicate || inputValue.trim() === "") return;
    setOriginalValue(inputValue); // 저장된 이름 갱신
    onStopEdit();
  };

  return (
    <div className={`folder-item ${isEditing ? "folder-item--editing" : ""}`}>
      {isEditing ? (
        <div className="folder-item__edit-wrapper">
          <input
            className="folder-item__input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <div className="folder-item__icons">
            <IoCheckmark
              className={`folder-item__icon folder-item__icon--confirm ${
                isModified ? "active" : ""
              }`}
              onClick={handleSave}
            />
            <IoCloseOutline
              className="folder-item__icon folder-item__icon--cancel"
              onClick={onRequestDelete}
            />
          </div>
        </div>
      ) : (
        <>
          <span className="folder-item__name">{originalValue}</span>
          <GoPencil className="folder-item__icon" onClick={onStartEdit} />
        </>
      )}
    </div>
  );
};

export default FolderListItem;
