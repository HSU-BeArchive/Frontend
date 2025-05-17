import { useState } from "react";
import dummyFolder from "../data/dummyFolders.json";

// 폴더 목록 상태 및 추가, 삭제, 편집
const useFolderList = () => {
  // 폴더 목록 -> api 연결 예정
  const [folders, setFolders] = useState(dummyFolder);

  const [editingId, setEditingId] = useState(null); // 편집 여부
  const [deletingId, setDeletingId] = useState(null); // 삭제 여부

  // 새 폴더 추가
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

  // 새로운 이름 반영
  const handleRenameFolder = (id, newName) => {
    setFolders((prev) =>
      prev.map((folder) =>
        folder.id === id ? { ...folder, name: newName } : folder
      )
    );
  };

  const deletingFolder = folders.find((f) => f.id === deletingId) || null;

  return {
    folders,
    setFolders,
    editingId,
    deletingId,
    deletingFolder,
    setEditingId,
    setDeletingId,
    handleAddFolder,
    handleConfirmDelete,
    handleRenameFolder,
  };
};

export default useFolderList;
