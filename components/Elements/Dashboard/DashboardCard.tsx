import React, { ReactNode } from "react";

interface DashboardCardProps{
  children:ReactNode;
  totalList:number;
  title:string;
}
const DashboardCard:React.FC<DashboardCardProps> = ({totalList,title,children}) => {
  return (
    <>
      <div className="p-5 bg-slate-500 text-white rounded-2xl">
        <div className="flex justify-between items-center mb-4 ">
          <div className="text-3xl font-semibold">{totalList}</div>
          <div>
            {children}
          </div>
        </div>
        <div className="text-sm">{title}</div>
      </div>
    </>
  );
};

export default DashboardCard;
