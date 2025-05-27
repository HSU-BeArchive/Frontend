// src/contexts/FolderContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import getFolderListApi from "../api/folder/getFolderListApi";
import createFolderApi from "../api/folder/createFolderApi";
import deleteFolderApi from "../api/folder/deleteFolderApi";
import updateFolderNameApi from "../api/folder/updateFolderNameApi";

const FolderContext = createContext();
export const useFolderContext = () => useContext(FolderContext);

export const FolderProvider = ({ children }) => {
  const [folders, setFolders] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // 1. 폴더 목록 조회
  const fetchFolders = async () => {
    const res = await getFolderListApi();
    if (res.success) {
      const formatted = res.data.folderSummeryList.map((folder) => ({
        id: folder.folderId,
        name: folder.folderName,
        isEmpty: folder.isEmpty,
        order: folder.folderOrder,
      }));
      setFolders(formatted);
    } else {
      console.error("폴더 목록 조회 실패:", res.message);
    }
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  // 2. 폴더 생성
  const handleAddFolder = async () => {
    const res = await createFolderApi("새 폴더");
    if (res.success) {
      const newFolder = {
        id: res.data.id,
        name: "새 폴더",
        isEmpty: false,
        order: folders.length,
      };
      setFolders((prev) => [...prev, newFolder]);
      setEditingId(res.data.id);
    } else {
      alert(res.message || "폴더 생성 실패");
    }
  };

  // 3. 폴더 삭제
  const handleConfirmDelete = async (id) => {
    const res = await deleteFolderApi(id);
    if (res.success) {
      setFolders((prev) => prev.filter((f) => f.id !== id));
    } else {
      alert(res.message || "폴더 삭제 실패");
    }
  };

  // 4. 폴더 이름 수정
  const handleRenameFolder = async (id, newName) => {
    const res = await updateFolderNameApi(id, newName);
    if (res.success) {
      setFolders((prev) =>
        prev.map((f) => (f.id === id ? { ...f, name: newName } : f))
      );
      return true;
    } else {
      alert(res.message || "폴더 이름 수정 실패");
      return false;
    }
  };

  return (
    <FolderContext.Provider
      value={{
        folders,
        setFolders,
        editingId,
        setEditingId,
        handleAddFolder,
        handleConfirmDelete,
        handleRenameFolder,
        fetchFolders,
      }}
    >
      {children}
    </FolderContext.Provider>
  );
};
