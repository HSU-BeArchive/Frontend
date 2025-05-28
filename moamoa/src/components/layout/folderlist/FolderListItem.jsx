import React, { useRef, useState } from "react";
import "./FolderList.scss";
import useEditableInput from "../../../hooks/useEditableInput";
import useDialog from "../../../hooks/useDialog";
import { isDuplicateFolderName } from "../../../utils/validation";
import { GoPencil } from "react-icons/go";
import { IoCheckmark } from "react-icons/io5";
import { TbTrash } from "react-icons/tb";
import createFolderApi from "../../../api/folder/createFolderApi";

const FolderListItem = ({
  id,
  name,
  folder,
  isEditing,
  onStartEdit,
  onStopEdit,
  onRequestDelete,
  onRename,
  folderNames,
  onDoubleClick,
  isActive,
}) => {
  const { inputValue, setInputValue, originalValue, isModified, commitValue } =
    useEditableInput(name);

  const { showDialog } = useDialog();
  const ref = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const isDuplicate = isDuplicateFolderName(
    inputValue,
    originalValue,
    folderNames
  );

  const handleSave = async () => {
    if (isSaving) return;
    setIsSaving(true);

    try {
      if (!isModified || inputValue.trim() === originalValue.trim()) {
        onStopEdit();
        return;
      }

      if (inputValue.trim() === "") {
        setErrorMessage("폴더명을 입력해 주세요.");
        return;
      }

      if (isDuplicate) {
        showDialog({
          title: "폴더 생성 중복",
          message: "기존의 폴더명과 중복되어 생성이 불가능합니다.",
          subMessage: "폴더명을 변경해 주세요.",
          confirmText: "확인",
        });
        return;
      }

      if (folder?.isNew) {
        const res = await createFolderApi(inputValue);
        if (res.success) {
          commitValue(inputValue);
          await onRename(id, inputValue, res.data.id);
          onStopEdit();
          setErrorMessage("");
        } else {
          setErrorMessage(res.message || "폴더 생성 중 오류가 발생했습니다.");
        }
        return;
      }

      const success = await onRename(id, inputValue);
      if (success) {
        commitValue(inputValue);
        onStopEdit();
        setErrorMessage("");
      } else {
        setErrorMessage("폴더 이름 수정 실패");
      }
    } catch (err) {
      console.error("폴더 저장 에러:", err);
      setErrorMessage("서버 통신 오류");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      ref={ref}
      onDoubleClick={() => {
        onDoubleClick?.(folder.id);
      }}
      className={`folder-item
        ${isEditing ? "folder-item--editing" : ""}
        ${isActive ? "folder-item--double-clicked" : ""}
        ${isActive && !isEditing ? "folder-item--hidden-icons" : ""}
      `}
    >
      {isEditing ? (
        <div className="folder-item__edit-wrapper">
          <input
            className="folder-item__input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSave();
              }
            }}
          />

          {errorMessage && (
            <div className="folder-item__error-message">{errorMessage}</div>
          )}

          <div className="folder-item__icons">
            <IoCheckmark
              className={`folder-item__icon folder-item__icon--confirm ${
                isModified ? "active" : ""
              }`}
              onClick={handleSave}
            />
            <TbTrash
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
