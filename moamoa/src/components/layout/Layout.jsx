import React from "react";
import "./Layout.scss";
import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import FolderList from "./folderlist/FolderList";
import { DialogProvider } from "../../contexts/DialogContext";

const Layout = () => {
  return (
    <div className="layout">
      <Header />
      <div className="layout__body">
        <DialogProvider>
          <div className="layout__sidebar">
            <FolderList />
          </div>
          <div className="layout__content">
            <Outlet />
          </div>
        </DialogProvider>
      </div>
    </div>
  );
};

export default Layout;
