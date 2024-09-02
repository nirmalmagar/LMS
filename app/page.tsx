import React from "react";
import Image from "next/image";

const page = () => {
  return (
    <>
      <div>
        {/* ----------------navbar---------------- */}
        <nav className="bg-gray-500 h-16 w-screen"></nav>
        {/* -------------------section------------------------ */}
        <section className="relative">
          <Image
            width={800}
            height={0}
            className="w-screen h-52"
            src={"/assets/library.png"}
            alt="library image"
          />
          <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] font-serif text-center text-white font-semibold">
            <h1 className="text-3xl shadow-xl">
              There are more than 500+ Books for Free
            </h1>
            <span className="shadow-xl">
              Welcome to library management system. Goti Goti dhandyabad dina
              chahanxu hjr hjr..
            </span>
          </div>
        </section>
        {/*--------------------latest books----------------------- */}
        <section></section>
      </div>
    </>
  );
};

export default page;
