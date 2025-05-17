import React from "react";
import "./FolderList.scss";
import useFolderList from "../../../hooks/useFolderList";
import { FaPlus } from "react-icons/fa6";
import FolderListItem from "./FolderListItem";
import Dialog from "../../common/dialog/Dialog";

const FolderList = () => {
  const MAX_NAME_LENGTH = 5;
  const {
    folders,
    editingId,
    deletingId,
    deletingFolder,
    setEditingId,
    setDeletingId,
    handleAddFolder,
    handleConfirmDelete,
    handleRenameFolder,
  } = useFolderList();

  // 보여질 폴더명 자리수
  const formatFolderName = (name) => {
    return name.length > 5 ? name.slice(0, MAX_NAME_LENGTH) + "…" : name;
  };

  return (
    <div className="folder-list">
      <div className="folder-list__header">
        <span className="folder-list__title">폴더</span>
        <FaPlus onClick={handleAddFolder} className="folder-list__add-button" />
      </div>

      <div className="folder-list__items">
        {folders.map((folder) => (
          <FolderListItem
            key={folder.id}
            id={folder.id}
            name={folder.name}
            isEditing={editingId === folder.id}
            onStartEdit={() => setEditingId(folder.id)}
            onStopEdit={() => setEditingId(null)}
            onRequestDelete={() => setDeletingId(folder.id)}
            onRename={handleRenameFolder}
            folderNames={folders.map((f) => f.name)}
          />
        ))}
      </div>

      {/* 삭제 모드 */}
      {deletingId !== null && (
        <Dialog
          title="폴더 생성 취소"
          message={`(${formatFolderName(
            deletingFolder.name
          )}) 폴더를 삭제하시겠습니까?`}
          subMessage="삭제할 경우 복구하실 수 없습니다."
          confirmText="삭제"
          cancelText="아니요"
          onCancel={() => setDeletingId(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
};

export default FolderList;
