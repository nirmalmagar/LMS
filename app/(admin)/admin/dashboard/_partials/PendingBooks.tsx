"use client";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import Image from "next/image";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { defaultFetcher, getFetcher } from "@/helpers/FetchHelper";
import HeadingText from "./HeadingText";

const PendingBookList = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  // books lists
  const {
    data: pendingBook,
    isLoading,
    mutate,
  } = useSWR(
    `${process.env.HOST}pending-books/?page=${currentPage} `,
    defaultFetcher
  );

  let totalPageArray = pendingBook?.results
    ? Array.from({ length: pendingBook?.total_pages }, (_, index) => index + 1)
    : [];

  let paginationLinks =
    pendingBook?.results &&
    totalPageArray.map((items: any, index: number) => {
      if (items < 10) {
        return (
          <span
            key={index}
            onClick={() => setCurrentPage(items)}
            className={`page-item ${
              currentPage === items ? "active" : ""
            } mx-0.5 text-xs cursor-pointer px-1.5`}
          >
            {items}
          </span>
        );
      }
    });

  const handlePageChange = (page: number) => {
    if (currentPage >= 1 && currentPage <= 10) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    mutate();
  }, [currentPage]);

  return (
    <>
      {isLoading ? (
        <p className="text-xl bg-white h-96 flex items-center justify-center mt-8 rounded-2xl">
          <span>Loading...</span>
        </p>
      ) : (
        <div className="mt-8 rounded-3xl bg-white pb-2.5 px-2 pt-2 shadow-default sm:px-7.5 xl:pb-1">
          <HeadingText heading="Pending Books" />
          <div className="max-w-full overflow-x-auto">
            <table className="w-full text-sm table-auto">
              <thead>
                <tr className="border-b-2 text-left">
                  <th className="py-4 px-2 font-medium text-black">S.N</th>
                  <th className="min-w-[80px] py-4 px-2 font-medium text-black">
                    Cover
                  </th>
                  <th className="min-w-[120px] py-4 px-2 font-medium text-black">
                    Title
                  </th>
                  <th className="max-w-[120px] py-4 px-2 font-medium text-black">
                    Author
                  </th>
                  <th className="min-w-[120px] py-4 px-2 font-medium text-black">
                    ISBN
                  </th>
                  <th className="min-w-[20px] py-4 px-2 font-medium text-black">
                    Publisher
                  </th>
                </tr>
              </thead>
              <tbody>
                {pendingBook?.results?.slice(0,5)?.map(
                  (pendingBooksList: Record<string, any>, index: number) => {
                    return (
                      <tr key={index}>
                        <td className="border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                          <h5 className="font-medium text-black">
                            {index + 1}
                          </h5>
                        </td>
                        <td className="border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                          <div className="relative w-12 h-12">
                            {pendingBooksList?.cover ? (
                              <Image
                                src={pendingBooksList?.cover}
                                className="rounded"
                                fill
                                sizes="fit"
                                style={{ objectFit: "cover" }}
                                alt={pendingBooksList?.title}
                              />
                            ) : (
                              <Image
                                src={"/assets/noimage.jpg"}
                                className="rounded"
                                fill
                                sizes="fit"
                                style={{ objectFit: "cover" }}
                                alt={"no image"}
                              />
                            )}
                          </div>
                        </td>
                        <td className="min-w-[80px] border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                          <p className="text-black" id="card_title">
                            {pendingBooksList.title}
                          </p>
                        </td>
                        <td className="max-w-[160px] border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                          <p className="text-black " id="card_title">
                            {pendingBooksList?.author}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                          <p className="text-black" id="card_title">
                            {pendingBooksList?.isbn}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                          <p className="text-black" id="card_title">
                            {pendingBooksList?.publisher}
                          </p>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
            {/* {pendingBook?.results?.length >= 10 && ( */}
              <div className="text-sm float-right m-4 flex items-center text-red-400 font-semibold">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <MdChevronLeft className="w-5 h-5" />
                </button>
                {paginationLinks}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === pendingBook?.total_pages}
                >
                  <MdChevronRight className="w-5 h-5" />
                </button>
              </div>
            {/* )} */}
          </div>
        </div>
      )}
    </>
  );
};

export default PendingBookList;
