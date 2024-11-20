import React from "react";
import { HiOutlineUsers } from "react-icons/hi2";

const DashboardCard = () => {
  return (
    <>
      <div className="p-5 bg-slate-600 text-white rounded-2xl">
        <div className="flex justify-between items-center mb-4 ">
          <div className="text-3xl font-semibold">345</div>
          <div>
            <HiOutlineUsers className="w-11 h-11 p-2 rounded-full bg-blue-900" />
          </div>
        </div>
        <div className="text-sm">Total Visitors</div>
      </div>
    </>
  );
};

export default DashboardCard;
