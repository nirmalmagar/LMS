"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import useSWR from "swr";
import Image from "next/image";
import { defaultFetcher } from "@/helpers/FetchHelper";
import Container from "@/components/Container";
import HomeLayout from "@/components/Layouts/HomeNavBar/HomeLayout";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { IoStatsChartOutline } from "react-icons/io5";
import { LiaWeightHangingSolid } from "react-icons/lia";
import { FaMapMarkerAlt } from "react-icons/fa";
import { GrLanguage } from "react-icons/gr";
import { TbTruckDelivery } from "react-icons/tb";
import { IoMdAdd } from "react-icons/io";
import { RiSubtractFill } from "react-icons/ri";

const page = () => {
  const [increment, setIncrement] = useState<number>(1);
  const { book_id } = useParams();

  const { data: bookId } = useSWR(
    `${process.env.HOST}books/${book_id}`,
    defaultFetcher
  );

  return (
    <>
      <HomeLayout>
        <Container>
          <div className="grid md:grid-cols-3 xl:grid-flow-col md:gap-[10rem] lg:gap-8 gap-y-6 mb-12 sm:text-left text-center">
            <div className="sm:w-fit w-screen sm:block flex items-center justify-center">
              <div className="relative h-[24rem] w-[16rem]">
                <Image
                  alt="student_image"
                  src={bookId?.cover}
                  fill
                  // className="object-cover"
                />
              </div>
            </div>
            <div className="col-span-2">
              <span className="bg-gray-100 rounded-md px-3 py-1 font-semibold text-sm">
                Paper Back
              </span>
              <h1 className="font-bold text-3xl py-2">{bookId?.title}</h1>
              <span>by: {bookId?.author}</span>
              <h2 className="font-semibold text-lg mb-4">
                Sold By: <span className="text-blue-800">Gyan Kosh Nepal </span>
              </h2>
              <div className="w-full h-[1px] bg-gray-200" />
              <div>
                <h3 className="text-3xl font-semibold my-4">Synopsis</h3>
                <p className="text-[17px] text-left">{bookId?.description}</p>
              </div>
              <div className="w-full h-[1px] my-8 bg-gray-200" />
              <div>
                <p className="text-2xl font-semibold mb-4 text-center sm:text-left">Other Info</p>
                <div id="other_info" className="grid sm:grid-cols-3 lg:grid-cols-4 gap-y-6 justify-items-center">
                  <div className="flex flex-col items-center border-2 border-gray-200 bg-gray-100 w-40 py-2 rounded-md">
                    <h5 className="text-lg text-gray-500">Page Count</h5>
                    <MdOutlineLibraryBooks className="w-8 h-10" />
                    <p className="text-lg font-semibold">304 Pages</p>
                  </div>
                  <div className="flex flex-col items-center border-2 border-gray-200 bg-gray-100 w-40 py-2 rounded-md">
                    <h5 className="text-lg text-gray-500">Weight</h5>
                    <LiaWeightHangingSolid className="w-8 h-10" />
                    <p className="text-lg font-semibold">285 g</p>
                  </div>
                  <div className="flex flex-col items-center border-2 border-gray-200 bg-gray-100 w-40 py-2 rounded-md">
                    <h5 className="text-lg text-gray-500">ISBN</h5>
                    <IoStatsChartOutline className="w-8 h-10" />
                    <p className="text-lg font-semibold">{bookId?.isbn}</p>
                  </div>
                  <div className="flex flex-col items-center border-2 border-gray-200 bg-gray-100 w-40 py-2 rounded-md">
                    <h5 className="text-lg text-gray-500">language</h5>
                    <GrLanguage className="w-8 h-10" />
                    <p className="text-lg font-semibold">English</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center text-left">
              <div>
              <div className="py-6 px-4 border-[3px] rounded-lg w-fit border-gray-100">
                <p className="font-semibold text-lg">
                  Get Estimated Arrival Time
                </p>
                <div className="flex items-center gap-x-4 mt-2">
                  <FaMapMarkerAlt className="w-5 h-5" />
                  <div>
                    <span className="font-semibold text-lg">Kathmandu</span>
                    <p className="text-sm -mt-1">Kathmandu, Nepal</p>
                  </div>
                </div>
                <div className="flex items-center gap-x-4 mt-2">
                  <TbTruckDelivery className="w-5 h-5" />
                  <div>
                    <span className="font-semibold text-lg">
                      Delivery Within
                    </span>
                    <p className="text-sm -mt-1">1 to 2 Days</p>
                  </div>
                </div>
                <div className="w-full h-[1px] bg-gray-200 my-4" />
                <p className="text-xl font-semibold">Rs. {bookId?.price}</p>
                <div className="bg-gray-100 flex justify-around my-2 py-2 rounded-md">
                  <button
                    className="border-2 border-gray-200 rounded-full p-1 bg-white"
                    onClick={() =>
                      setIncrement(increment > 1 ? increment - 1 : 1)
                    }
                  >
                    <RiSubtractFill className="font-bold text-xl" />
                  </button>
                  <span className="font-semibold text-lg mt-0.5">
                    QTY: {increment}
                  </span>
                  <button
                    className="border-2 border-gray-200 rounded-full p-1 bg-white"
                    onClick={() => setIncrement(increment + 1)}
                  >
                    <IoMdAdd className="font-bold text-xl" />
                  </button>
                </div>
                <button className="font-semibold text-lg bg-blue-800 rounded-md py-1 mt-2 w-full text-white text-center">
                  ADD TO CART
                </button>
              </div>
              </div>
              </div>
          </div>
        </Container>
      </HomeLayout>
    </>
  );
};

export default page;