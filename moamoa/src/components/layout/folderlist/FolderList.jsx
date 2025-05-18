import React from "react";
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
import Dialog from "../../common/dialog/Dialog";

const FolderList = () => {
  const MAX_NAME_LENGTH = 5;
  const {
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
  } = useFolderList();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const formatFolderName = (name) => {
    return name.length > MAX_NAME_LENGTH
      ? name.slice(0, MAX_NAME_LENGTH) + "…"
      : name;
  };

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
                onRequestDelete={() => setDeletingId(folder.id)}
                onRename={handleRenameFolder}
                folderNames={folders.map((f) => f.name)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

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

function SortableFolder({
  id,
  folder,
  isEditing,
  onStartEdit,
  onStopEdit,
  onRequestDelete,
  onRename,
  folderNames,
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
        isEditing={isEditing}
        onStartEdit={onStartEdit}
        onStopEdit={onStopEdit}
        onRequestDelete={onRequestDelete}
        onRename={onRename}
        folderNames={folderNames}
      />
    </div>
  );
}

export default FolderList;
