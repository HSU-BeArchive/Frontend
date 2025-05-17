import React, { useState } from "react";
import "./FolderList.scss";
import Dialog from "../dialog/Dialog";
import useEditableInput from "../../../hooks/useEditableInput";
import { isDuplicateFolderName } from "../../../utils/validation";
import { GoPencil } from "react-icons/go";
import { IoCheckmark, IoCloseOutline } from "react-icons/io5";

const FolderListItem = ({
  id,
  name,
  isEditing,
  onStartEdit,
  onStopEdit,
  onRequestDelete,
  onRename,
  folderNames,
}) => {
  const { inputValue, setInputValue, originalValue, isModified, commitValue } =
    useEditableInput(name);
  const [showDialog, setShowDialog] = useState(false); // 중복 경고창

  // 중복 여부 체크
  const isDuplicate = isDuplicateFolderName(
    inputValue,
    originalValue,
    folderNames
  );

  // 이름 수정
  const handleSave = () => {
    // 비어있는 경우
    if (inputValue.trim() === "") return;
    // 중복된 경우
    if (isDuplicate) {
      setShowDialog(true);
      return;
    }
    commitValue(inputValue); // 저장된 이름 갱신
    onRename(id, inputValue); // 상태에 반영 (UI 갱신용)
    onStopEdit();
  };

  return (
    <div className={`folder-item ${isEditing ? "folder-item--editing" : ""}`}>
      {isEditing ? (
        <div className="folder-item__edit-wrapper">
          <input
            className="folder-item__input"
            value={inputValue}
            onChange={setInputValue}
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
