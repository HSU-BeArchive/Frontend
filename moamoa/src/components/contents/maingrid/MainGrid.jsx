import React, { useState } from "react";
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
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import "./MainGrid.scss";
import dummyFolders from "../../../data/dummyFolders.json";
import FolderItem from "./folderitem/FolderItem";

const MainGrid = () => {
  const [folders, setFolders] = useState(dummyFolders);

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
    <div className="main-grid">
      <div className="folder-grid">
        <div className="folder-grid__header">
          <span className="folder-grid__title">아카이브폴더</span>
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
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};

function SortableFolderItem({ id, folder }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <FolderItem name={folder.name} isEmpty={folder.isEmpty} />
    </div>
  );
}

export default MainGrid;
