import React, { useState } from "react";
import "./FolderList.scss";
import { FaPlus } from "react-icons/fa6";
import FolderListItem from "./FolderListItem";

const FolderList = () => {
  const [folders, setFolders] = useState([
    { id: 1, name: "폴더1" },
    { id: 2, name: "폴더2" },
    { id: 3, name: "폴더3" },
  ]);

  const [editingId, setEditingId] = useState(null); // 수정 모드인 폴더

  // 새폴더 추가
  const handleAddFolder = () => {
    const newId =
      folders.length > 0 ? Math.max(...folders.map((f) => f.id)) + 1 : 1;
    const newFolder = { id: newId, name: "새 폴더" };

    setFolders([...folders, newFolder]);
    setEditingId(newId);
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
          />
        ))}
      </div>
    </div>
  );
};

export default FolderList;
