"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";
import Image from "next/image";
import { defaultFetcher, getFetcher } from "@/helpers/FetchHelper";
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
import Heading from "@/components/HomePages/Heading";
import DateToString from "@/components/DateConverter/DateToString";
import RecommendedBook from "@/components/RecommendedBook";

const page = () => {
  const [increment, setIncrement] = useState<number>(1);
  const { book_id } = useParams();
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const { data: recommendedBookURL , isLoading:recommendedLoading} = useSWR(
    `${process.env.HOST}books/${book_id}/recommended-books/`,
    getFetcher
  );
  const { data: bookId, isLoading } = useSWR(
    `${process.env.HOST}books/${book_id}`,
    getFetcher
  );

  // const handlePageChange = (page: number) => {
  //   if (page >= 1 && page <= totalPages) {
  //     setCurrentPage(page);
  //   }
  // };

  useEffect(() => {
    // mutateActivityLogData(currentPage);
  }, [currentPage]);
  return (
    <>
      <HomeLayout>
        <Container>
          {isLoading ? (
            <div className="text-center text-xl h-96">Loading.....</div>
          ) : (
            <div className="grid md:grid-cols-3 xl:grid-flow-col md:gap-[10rem] lg:gap-8 gap-y-6 mb-12 sm:text-left text-center">
              <div className="sm:w-fit w-screen sm:block flex items-center justify-center">
                <div className="relative h-[20rem] w-[16rem]">
                  <Image alt="student_image" src={bookId?.cover} fill />
                </div>
                <div className="flex mt-4 gap-2 font-semibold">
                  <span className="text-lg">Publication Date:</span>
                  <div className="text-gray-600">
                    <DateToString inputDate={bookId?.publication_date} />
                  </div>
                </div>
              </div>
              <div className="col-span-2">
                <span className="bg-gray-100 rounded-md px-3 py-1 font-semibold text-sm">
                  Paper Back
                </span>
                <h1 className="font-bold text-3xl py-2">{bookId?.title}</h1>
                <h1>
                  <span className="font-semibold">by:</span> {bookId?.author}
                </h1>
                <h2 className="font-semibold text-md mt-2 mb-4">
                  Sold By:{" "}
                  <span className="text-blue-800">Gyan Kosh Nepal </span>
                </h2>
                <div className="w-full h-[1px] bg-gray-200" />
                <div>
                  <h3 className="text-3xl font-semibold my-4">Synopsis</h3>
                  <p className="text-[17px] text-left">{bookId?.description}</p>
                </div>
                <div className="w-full h-[1px] my-8 bg-gray-200" />
                <div>
                  <p className="text-2xl font-semibold mb-4 text-center sm:text-left">
                    Other Info
                  </p>
                  <div
                    id="other_info"
                    className="grid sm:grid-cols-3 lg:grid-cols-4 gap-y-6 justify-items-center"
                  >
                    <div className="flex flex-col items-center border-2 border-gray-200 bg-gray-100 w-40 py-2 rounded-md">
                      <h5 className="text-lg text-gray-500">Page Count</h5>
                      <MdOutlineLibraryBooks className="w-8 h-10" />
                      <p className="text-lg font-semibold">{bookId?.pages}</p>
                    </div>
                    {/* <div className="flex flex-col items-center border-2 border-gray-200 bg-gray-100 w-40 py-2 rounded-md">
                    <h5 className="text-lg text-gray-500">Weight</h5>
                    <LiaWeightHangingSolid className="w-8 h-10" />
                    <p className="text-lg font-semibold">285 g</p>
                  </div> */}
                    <div className="flex flex-col items-center border-2 border-gray-200 bg-gray-100 w-40 py-2 rounded-md">
                      <h5 className="text-lg text-gray-500">ISBN</h5>
                      <IoStatsChartOutline className="w-8 h-10" />
                      <p className="text-lg font-semibold">{bookId?.isbn}</p>
                    </div>
                    {/* <div className="flex flex-col items-center border-2 border-gray-200 bg-gray-100 w-40 py-2 rounded-md">
                    <h5 className="text-lg text-gray-500">language</h5>
                    <GrLanguage className="w-8 h-10" />
                    <p className="text-lg font-semibold">English</p>
                  </div> */}
                  </div>
                </div>
              </div>
            </div>
          )}
        </Container>
        <Container>
          {/* Recommended books */}
          <Heading title={"Recommended Books List"}>
            Discover the Most Popular Recommended Books in Our Frequently
            Updated Best Sellers Collection.
          </Heading>
          {recommendedLoading ? (
            <div className="text-center text-xl h-96">Loading.....</div>
          ) :
          <section className="my-12">
            <RecommendedBook url={recommendedBookURL} />
          </section>
        }
        </Container>
      </HomeLayout>
    </>
  );
};

export default page;
