import React, { useState } from "react";
import "./FolderList.scss";
import { FaPlus } from "react-icons/fa6";
import FolderListItem from "./FolderListItem";
import Dialog from "../../common/dialog/Dialog";

const FolderList = () => {
  const [folders, setFolders] = useState([
    { id: 1, name: "폴더1" },
    { id: 2, name: "매우긴폴더명입니다" },
    { id: 3, name: "폴더3" },
  ]);

  const [editingId, setEditingId] = useState(null); // 수정 모드인 폴더
  const [deletingId, setDeletingId] = useState(null); // 삭제모드인 폴더

  // 새폴더 추가
  const handleAddFolder = () => {
    const newId =
      folders.length > 0 ? Math.max(...folders.map((f) => f.id)) + 1 : 1;
    const newFolder = { id: newId, name: "새 폴더" };

    setFolders([...folders, newFolder]);
    setEditingId(newId);
  };

  // 폴더 삭제
  const handleConfirmDelete = () => {
    setFolders(folders.filter((f) => f.id !== deletingId));
    setDeletingId(null);
  };
  const deletingFolder = folders.find((f) => f.id === deletingId);

  // 폴더명 이름 5자리까지만
  const formatFolderName = (name) => {
    return name.length > 5 ? name.slice(0, 5) + "…" : name;
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
            name={formatFolderName(folder.name)}
            isEditing={editingId === folder.id}
            onStartEdit={() => setEditingId(folder.id)}
            onStopEdit={() => setEditingId(null)}
            onRequestDelete={() => setDeletingId(folder.id)}
            folderNames={folders.map((f) => f.name)}
          />
        ))}
      </div>

      {/* 삭제 모드 */}
      {deletingId !== null && (
        <Dialog
          title="폴더 생성 취소"
          message={`(${deletingFolder.name}) 폴더를 삭제하시겠습니까?`}
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
