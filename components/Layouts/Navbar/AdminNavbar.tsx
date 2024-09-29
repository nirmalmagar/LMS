"use client"
import React from "react";
import { DarkModeSwitcher } from "@/components/Elements/DarkModeSwitcher";

const AdminNavbar = () => {
  return (
    <div className="bg-slate-800 sticky top-0 flex justify-end items-center gap-20 px-12 text-white py-4">
    <DarkModeSwitcher/>
    
      <div className="text-right text-sm">
        <h1>administrator@gmail.com</h1>
        <span>(admin)</span>
      </div>
    </div>
  );
};

export default AdminNavbar;
