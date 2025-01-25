"use client"
import React from "react";
import DarkModeSwitcher from "@/components/Elements/DarkModeSwitcher";
import UserDropdown from "@/components/Header/UserDropdown";

const StudentNavbar = () => {
  return (
    <div className="dark:bg-red-900 bg-blue-400 text-black sticky z-20 top-0 flex justify-end items-center gap-20 px-12 py-2">
    <DarkModeSwitcher/>
      <div>
        <UserDropdown />
      </div>
    </div>
  );
};

export default StudentNavbar;
