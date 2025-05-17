import React, { useState } from "react";
import { FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import "./FolderList.scss";
import Dialog from "../../common/dialog/Dialog";
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
  const [showDialog, setShowDialog] = useState(false); // 중복 경고창

  const isModified = inputValue !== originalValue; // 수정 여부
  const isDuplicate =
    inputValue.trim() !== originalValue &&
    folderNames.includes(inputValue.trim()); // 중복 여부

  // 이름 수정
  const handleSave = () => {
    // 비어있는 경우
    if (inputValue.trim() === "") return;
    // 중복된 경우
    if (isDuplicate) {
      setShowDialog(true);
      return;
    }
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

      {/* 이름 중복 경고 Dialog */}
      {showDialog && (
        <Dialog
          title="폴더 생성 중복"
          message="기존의 폴더명과 중복되어 생성이 불가능합니다."
          subMessage="폴더명을 변경해 주세요."
          confirmText="확인"
          onConfirm={() => setShowDialog(false)}
        />
      )}
    </div>
  );
};

export default FolderListItem;
