import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "./FolderList.scss";
import useFolderList from "../../../hooks/useFolderList";
import { FaPlus } from "react-icons/fa6";
import FolderListItem from "./FolderListItem";
import useDialog from "../../../hooks/useDialog";

const FolderList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeFolderId, setActiveFolderId] = useState(null); // 더블클릭한 폴더

  const MAX_NAME_LENGTH = 5;
  const {
    folders,
    setFolders,
    editingId,
    setEditingId,
    handleAddFolder,
    handleConfirmDelete,
    handleRenameFolder,
  } = useFolderList();

  // 경로가 archive가 아닐 경우 비활성화
  useEffect(() => {
    const isArchiveRoute = /^\/archive(\/|$)/.test(location.pathname);
    if (!isArchiveRoute) {
      setActiveFolderId(null);
    }
  }, [location.pathname]);

  // 더블클릭 이벤트
  const handleDoubleClick = (folderId) => {
    setActiveFolderId(folderId);
    navigate(`/archive/${folderId}`);
  };

  const formatFolderName = (name) => {
    return name.length > MAX_NAME_LENGTH
      ? name.slice(0, MAX_NAME_LENGTH) + "…"
      : name;
  };

  // Dialog 제어
  const { showDialog } = useDialog();
  const handleDelete = (folder) => {
    showDialog({
      title: "폴더 생성 취소",
      message: `(${formatFolderName(folder.name)}) 폴더를 삭제하시겠습니까?`,
      subMessage: "삭제할 경우 복구하실 수 없습니다.",
      confirmText: "삭제",
      cancelText: "아니요",
      onConfirm: () => handleConfirmDelete(folder.id),
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleDragEnd = ({ active, over }) => {
    if (active.id !== over?.id) {
      const oldIndex = folders.findIndex((f) => f.id === active.id);
      const newIndex = folders.findIndex((f) => f.id === over?.id);
      setFolders((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  return (
    <div className="folder-list">
      <div className="folder-list__header">
        <span className="folder-list__title">폴더</span>
        <FaPlus onClick={handleAddFolder} className="folder-list__add-button" />
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToParentElement]}
      >
        <SortableContext
          items={folders.map((f) => f.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="folder-list__items">
            {folders.map((folder) => (
              <SortableFolder
                key={folder.id}
                id={folder.id}
                folder={folder}
                isEditing={editingId === folder.id}
                onStartEdit={() => setEditingId(folder.id)}
                onStopEdit={() => setEditingId(null)}
                onRequestDelete={() => handleDelete(folder)}
                onRename={handleRenameFolder}
                folderNames={folders.map((f) => f.name)}
                onDoubleClick={handleDoubleClick}
                isActive={activeFolderId === folder.id}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

function SortableFolder({
  id,
  folder,
  isEditing,
  onStartEdit,
  onStopEdit,
  onRequestDelete,
  onRename,
  folderNames,
  onDoubleClick,
  isActive,
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <FolderListItem
        id={folder.id}
        name={folder.name}
        folder={folder}
        isEditing={isEditing}
        onStartEdit={onStartEdit}
        onStopEdit={onStopEdit}
        onRequestDelete={onRequestDelete}
        onRename={onRename}
        folderNames={folderNames}
        isActive={isActive}
        onDoubleClick={onDoubleClick}
      />
    </div>
  );
}

export default FolderList;
