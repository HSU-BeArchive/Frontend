import React from "react";
import { useNavigate } from "react-router-dom";
import { useFolderContext } from "../../../contexts/FolderContext";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import "./MainGrid.scss";
import FolderItem from "./folderitem/FolderItem";

const MainGrid = () => {
  const { folders, handleReorderFolders } = useFolderContext();
  const navigate = useNavigate();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleFolderClick = (folderId) => {
    navigate(`/archive/${folderId}`);
  };

  const handleDragEnd = ({ active, over }) => {
    if (active.id !== over?.id) {
      handleReorderFolders(active.id, over.id);
    }
  };

  return (
    <div className="folder-grid">
      <div className="folder-grid__header">
        <span className="folder-grid__title">아카이브 보드</span>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToParentElement]}
      >
        <SortableContext
          items={folders.map((f) => f.id)}
          strategy={rectSortingStrategy}
        >
          <div className="folder-grid__items">
            {folders.map((folder) => (
              <SortableFolderItem
                key={folder.id}
                id={folder.id}
                folder={folder}
                onClick={() => handleFolderClick(folder.id)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

function SortableFolderItem({ id, folder, onClick }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={onClick}
    >
      <FolderItem name={folder.name} isEmpty={folder.isEmpty} />
    </div>
  );
}

export default MainGrid;
