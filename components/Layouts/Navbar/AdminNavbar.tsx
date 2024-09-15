"use client"
import React, { useState } from "react";
import ReactSwitch from "react-switch";
const AdminNavbar = () => {
  const [darkModeToggle, setDarkMode] = useState<boolean>(false);
  return (
    <div className="bg-slate-800 sticky top-0 flex justify-end items-center gap-20 px-12 text-white py-4">
      <ReactSwitch
        onChange={() => setDarkMode(!darkModeToggle)}
        checked={darkModeToggle}
      />
      <div className="text-right text-sm">
        <h1>administrator@gmail.com</h1>
        <span>(admin)</span>
      </div>
    </div>
  );
};

export default AdminNavbar;
