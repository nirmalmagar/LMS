import React, { ReactNode } from "react";
import UserSidebar from "./UserSidebar";
import UserNavbar from "./UserNavbar";
interface DefaultLayoutType {
  children: ReactNode;
}
const DefaultLayout: React.FC<DefaultLayoutType> = ({ children }) => {
  return (
    <div className="bg-gray-200">
      {/* user sidebar */}
      <div className="flex h-screen">
        <UserSidebar />
        <div className="flex flex-1 overflow-x-hidden overflow-y-auto relative flex-col">
          <UserNavbar />
          <main className="p-8 rounded-xl">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
