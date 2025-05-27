import { useState, useEffect } from "react";
import getFolderListApi from "../api/folder/getFolderListApi";
import updateFolderNameApi from "../api/folder/updateFolderNameApi";
import deleteFolderApi from "../api/folder/deleteFolderApi";

// 폴더 목록 상태 및 추가, 삭제, 편집
const useFolderList = () => {
  const [folders, setFolders] = useState([]);
  const [editingId, setEditingId] = useState(null); // 편집 여부

  // 폴더 목록 조회
  useEffect(() => {
    const fetchFolders = async () => {
      const res = await getFolderListApi();

      if (res.success) {
        // folderSummeryList를 변환해서 상태에 저장
        const formattedFolders = res.data.folderSummeryList.map((folder) => ({
          id: folder.folderId,
          name: folder.folderName,
          order: folder.folderOrder,
        }));
        setFolders(formattedFolders);
      } else {
        console.error("폴더 목록 로딩 실패:", res.message);
      }
    };

    fetchFolders();
  }, []);

  // 새 폴더 추가
  const handleAddFolder = () => {
    const newId =
      folders.length > 0 ? Math.max(...folders.map((f) => f.id)) + 1 : 1;
    const newFolder = { id: newId, name: "새 폴더", isNew: true };

    setFolders([...folders, newFolder]);
    setEditingId(newId);
  };

  // 폴더 삭제
  const handleConfirmDelete = async (id) => {
    const res = await deleteFolderApi(id);

    if (res.success) {
      setFolders((prev) => prev.filter((f) => f.id !== id));
    } else {
      alert(res.message || "폴더 삭제 중 오류가 발생했습니다.");
    }
  };

  // 새로운 이름 반영
  const handleRenameFolder = async (id, newName) => {
    const res = await updateFolderNameApi(id, newName);

    if (res.success) {
      setFolders((prev) =>
        prev.map((folder) =>
          folder.id === id
            ? { ...folder, name: newName, isNew: false }
            : folder
        )
      );
    } else {
      console.warn("폴더 이름 수정 실패:", res.message);
    }
  };

  return {
    folders,
    setFolders,
    editingId,
    setEditingId,
    handleAddFolder,
    handleConfirmDelete,
    handleRenameFolder,
  };
};

export default useFolderList;
