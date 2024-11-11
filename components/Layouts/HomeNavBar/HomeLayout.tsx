import React, { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface HomeLayoutProps {
  children?: ReactNode;
}
const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
  return (
    <>
      {/* ---------------navbar-------------- */}
      <Navbar />
      <main className="mt-14">
        {children}
      </main>
      {/* ---------------footer--------------- */}
      <Footer />
    </>
  );
};

export default HomeLayout;
