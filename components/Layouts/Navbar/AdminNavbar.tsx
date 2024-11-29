"use client"
import React from "react";
import { DarkModeSwitcher } from "@/components/Elements/DarkModeSwitcher";
import DropdownAdmin from "@/components/Header/DropdownAdmin";

const AdminNavbar = () => {
  return (
    <div className="bg-white text-black sticky z-20 top-0 flex justify-end items-center gap-20 px-12 py-2">
    <DarkModeSwitcher/>
      <div>
        <DropdownAdmin />
      </div>
    </div>
  );
};

export default AdminNavbar;
