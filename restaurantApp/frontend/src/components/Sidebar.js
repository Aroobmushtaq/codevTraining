import React from "react";
import { Link } from "react-router-dom";
import {ListOrdered, Utensils , LayoutDashboard } from "lucide-react";
function Sidebar() {
  return (
    <div className="w-64 bg-[#251D18] text-white min-h-screen">
      
      {/* Flex Column Layout */}
      <div className=" p-5">

        <h2 className="text-xl font-bold mb-6 font-serif">
          Admin Panel
        </h2>
<div className="text-[#A8ADA0]">
        <Link
          to="/admin/dashboard"
          className="block hover:bg-gray-700 p-2  rounded"
        >
          <LayoutDashboard className="inline-block mr-2" size={18} />
          Dashboard
        </Link>

        <Link
          to="/admin/menu"
          className="block hover:bg-gray-700 p-2 rounded"
        >
          <Utensils  className="inline-block mr-2" size={18} />
          Manage Menu
        </Link>

        <Link
          to="/admin/orders"
          className="block hover:bg-gray-700 p-2 rounded"
        >
          <ListOrdered className="inline-block mr-2" size={18} />
          orders
        </Link>

      </div>
</div>
    </div>
  );
}

export default Sidebar;