import React, { ReactNode } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";

interface DefaultLayoutType {
  children: ReactNode;
}
const DefaultLayout: React.FC<DefaultLayoutType> = ({ children }) => {
  return (
    <div>
      {/* admin sidebar */}
      <div className="flex">
        <AdminSidebar />
        <div className="flex flex-1 w-full flex-col">
          <AdminNavbar />
          <main className="p-8">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
