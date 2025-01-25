import React, { ReactNode } from "react";
import StudentSidebar from "./StudentSidebar";
import StudentNavbar from "./StudentNavbar";
interface DefaultLayoutType {
  children: ReactNode;
}
const DefaultLayout: React.FC<DefaultLayoutType> = ({ children }) => {
  return (
    <div className="bg-gray-200">
      {/* admin sidebar */}
      <div className="flex h-screen">
        <StudentSidebar />
        <div className="flex flex-1 overflow-x-hidden overflow-y-auto relative flex-col">
          <StudentNavbar />
          <main className="p-8 rounded-xl">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
