"use client";
import React, { ReactNode, useEffect, useState } from "react";
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
      <main>{children}</main>
      {/* ---------------footer--------------- */}
      <Footer />
    </>
  );
};

export default HomeLayout;
