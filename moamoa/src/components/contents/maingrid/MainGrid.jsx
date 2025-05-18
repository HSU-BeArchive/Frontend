import React from "react";
import "./MainGrid.scss";
import dummyFolders from "../../../data/dummyFolders.json";
import FolderItem from "./folderitem/FolderItem";

const MainGrid = () => {
  return (
    <div className="main-grid">
      <div className="folder-grid">
        <div className="folder-grid__header">
          <span className="folder-grid__title">아카이브폴더</span>
        </div>
        <div className="folder-grid__items">
          {dummyFolders.map((folder) => (
            <FolderItem
              key={folder.id}
              name={folder.name}
              isEmpty={folder.isEmpty}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainGrid;
