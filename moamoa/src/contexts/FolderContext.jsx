// src/contexts/FolderContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import getFolderListApi from "../api/folder/getFolderListApi";
import createFolderApi from "../api/folder/createFolderApi";
import deleteFolderApi from "../api/folder/deleteFolderApi";
import updateFolderNameApi from "../api/folder/updateFolderNameApi";
import setFolderOrderApi from "../api/folder/setFolderOrderApi";

const FolderContext = createContext();
export const useFolderContext = () => useContext(FolderContext);

export const FolderProvider = ({ children }) => {
  const [folders, setFolders] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [activeFolderId, setActiveFolderId] = useState(null);

  // 1. 폴더 목록 조회
  const fetchFolders = async () => {
    const res = await getFolderListApi();
    if (res.success) {
      const formatted = res.data.folderSummeryList
        .map((folder) => ({
          id: folder.folderId,
          name: folder.folderName,
          isEmpty: folder.isEmpty,
          order: folder.folderOrder,
        }))
        .sort((a, b) => a.order - b.order);
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
  const handleRenameFolder = async (id, newName, realId = null) => {
    const folderId = realId ?? id;
    const res = await updateFolderNameApi(folderId, newName);
    if (res.success) {
      setFolders((prev) =>
        prev.map((f) =>
          f.id === id ? { ...f, id: folderId, name: newName, isNew: false } : f
        )
      );
      return true;
    } else {
      alert(res.message || "폴더 이름 수정 실패");
      return false;
    }
  };

  // 5. 폴더 순서 변경
  const handleReorderFolders = async (activeId, overId) => {
    const oldIndex = folders.findIndex((f) => f.id === activeId);
    const newIndex = folders.findIndex((f) => f.id === overId);
    if (oldIndex === -1 || newIndex === -1) return;

    const reordered = arrayMove(folders, oldIndex, newIndex);
    setFolders(reordered.map((folder, idx) => ({ ...folder, order: idx })));

    for (let i = 0; i < reordered.length; i++) {
      const folder = reordered[i];
      if (folder.order !== i) {
        await setFolderOrderApi(folder.id, i);
      }
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
        handleReorderFolders,
        fetchFolders,
        activeFolderId,
        setActiveFolderId,
      }}
    >
      {children}
    </FolderContext.Provider>
  );
};
