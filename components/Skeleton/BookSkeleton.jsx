import React from "react";
import Container from "../Container";

const BookSkeleton = () => {
  return (
    <>
    <Container>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8 xl:grid-cols-5 gap-y-12 gap-x-12">
        <div className="">
          <div class="w-60 animate-pulse h-[300px] rounded-t-md bg-gray-300 p-4" />
          <div className="bg-gray-400 rounded-b-md py-2 animate-pulse w-60 ">
            <div className="bg-gray-200 h-2 w-52 ml-3" />
            <div className="bg-gray-200 h-2 w-52 mt-2 ml-3" />
            <div className="bg-gray-200 h-2 w-48 ml-7 mt-2" />
          </div>
        </div>
        <div className="">
          <div class="w-60 animate-pulse h-[300px] rounded-t-md bg-gray-300 p-4" />
          <div className="bg-gray-400 rounded-b-md py-2 animate-pulse w-60 ">
            <div className="bg-gray-200 h-2 w-52 ml-3" />
            <div className="bg-gray-200 h-2 w-52 mt-2 ml-3" />
            <div className="bg-gray-200 h-2 w-48 ml-7 mt-2" />
          </div>
        </div>
        <div className="">
          <div class="w-60 animate-pulse h-[300px] rounded-t-md bg-gray-300 p-4" />
          <div className="bg-gray-400 rounded-b-md py-2 animate-pulse w-60 ">
            <div className="bg-gray-200 h-2 w-52 ml-3" />
            <div className="bg-gray-200 h-2 w-52 mt-2 ml-3" />
            <div className="bg-gray-200 h-2 w-48 ml-7 mt-2" />
          </div>
        </div>
        <div className="">
          <div class="w-60 animate-pulse h-[300px] rounded-t-md bg-gray-300 p-4" />
          <div className="bg-gray-400 rounded-b-md py-2 animate-pulse w-60 ">
            <div className="bg-gray-200 h-2 w-52 ml-3" />
            <div className="bg-gray-200 h-2 w-52 mt-2 ml-3" />
            <div className="bg-gray-200 h-2 w-48 ml-7 mt-2" />
          </div>
        </div>
        <div className="">
          <div class="w-60 animate-pulse h-[300px] rounded-t-md bg-gray-300 p-4" />
          <div className="bg-gray-400 rounded-b-md py-2 animate-pulse w-60 ">
            <div className="bg-gray-200 h-2 w-52 ml-3" />
            <div className="bg-gray-200 h-2 w-52 mt-2 ml-3" />
            <div className="bg-gray-200 h-2 w-48 ml-7 mt-2" />
          </div>
        </div>
      </div>
      </Container>
    </>
  );
};

export default BookSkeleton;
