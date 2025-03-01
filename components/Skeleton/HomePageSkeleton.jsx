import React from "react";

const HomePageSkeleton = () => {
  return (
    <>
      <div class=" w-full h-[500px] rounded-md border bg-gray-300 p-4">
        <div class="flex flex-col animate-pulse items-center justify-center mt-20 space-x-4">
          <div className="bg-gray-200 w-44 h-6 rounded-md" />
          <ul className="flex gap-20 mt-10">
            <li className="bg-gray-200 w-28 h-4 rounded-md"></li>
            <li className="bg-gray-200 w-28 h-4 rounded-md"></li>
            <li className="bg-gray-200 w-28 h-4 rounded-md"></li>
            <li className="bg-gray-200 w-28 h-4 rounded-md"></li>
            <li className="bg-gray-200 w-28 h-4 rounded-md"></li>
          </ul>
          <div className="bg-gray-200 mt-20 w-96 h-12 rounded-md mb-12" />
          <div className="bg-gray-200 w-[700px] h-6 rounded-md" />
          <div className="bg-gray-200 w-[700px] h-4 mt-2 rounded-md" />
        </div>
      </div>
    </>
  );
};

export default HomePageSkeleton;
