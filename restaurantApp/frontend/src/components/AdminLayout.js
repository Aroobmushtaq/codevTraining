import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
function AdminLayout() {
  return (
    <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col"><Navbar />
        <div className="flex-1 p-6 bg-gray-100">
          <Outlet />
        </div>
        </div>
    </div>
  );
}

export default AdminLayout;