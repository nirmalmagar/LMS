"use client"
import React from "react";
// import { DarkModeSwitcher } from "@/components/Elements/DarkModeSwitcher";
import DarkModeSwitcher from "@/components/Elements/DarkModeSwitcher";
import DropdownAdmin from "@/components/Header/DropdownAdmin";

const AdminNavbar = () => {
  return (
    <div className="dark:bg-red-900 bg-blue-400 text-black sticky z-20 top-0 flex justify-end items-center gap-20 px-12 py-2">
    {/* <DarkModeSwitcher/> */}
    <DarkModeSwitcher/>
      <div>
        <DropdownAdmin />
      </div>
    </div>
  );
};

export default AdminNavbar;
