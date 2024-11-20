import React, { ReactNode } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";

interface DefaultLayoutType {
  children: ReactNode;
}
const DefaultLayout: React.FC<DefaultLayoutType> = ({ children }) => {
  return (
    <div className="bg-gray-200">
      {/* admin sidebar */}
      <div className="flex h-screen">
        <AdminSidebar />
        <div className="flex flex-1 overflow-x-hidden overflow-y-auto relative flex-col">
          <AdminNavbar />
          <main className="p-8">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
