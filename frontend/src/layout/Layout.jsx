// components/Layout.jsx
import React from "react";
import SideBar from "../layout/SideBar";
import Header from "../layout/Header";

const Layout = ({ children }) => {
  return (
    <div className="flex">
      < SideBar />
      <main className="w-full p-1">
        { <Header />       /*Breadcrumb bar */}
        {children}       {/* Current route content */}
      </main>
    </div>
  );
};

export default Layout;
