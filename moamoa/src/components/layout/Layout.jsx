import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <p>Layout - Header, FolderList 추가 예정</p>
      <Outlet />
    </div>
  );
};

export default Layout;
