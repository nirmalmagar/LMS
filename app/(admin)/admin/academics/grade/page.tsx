"use client"
import React, { useEffect, useState } from "react";
import DefaultLayout from "@/components/Layouts/Navbar/DefaultLayout";
import GradeTableList from "./_partials/GradeTableList";
import useSWR from "swr";
import { defaultFetcher } from "@/helpers/FetchHelper";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const page = () => {
  const [gradeListData, setGradeListData] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState<number>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const {
    data: gradeList,
    isLoading,
    mutate,
  } = useSWR(`${process.env.HOST}grades?page=${currentPage}`, defaultFetcher);
  
  // pagination number lists in array
  let totalPageArray = gradeListData
    ? Array.from({ length: totalPages }, (_, index) => index + 1)
    : [];

  // pagination
  let paginationLinks =
  gradeListData &&
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

  // handle page change
  const handlePageChange = (page: number) => {
    if (currentPage >= 1 && currentPage <= 10) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    setTotalPages(gradeList?.total_pages);
    setCurrentPage(gradeList?.current_page);
    setGradeListData(gradeList?.results);
    mutate?.();
  }, []);

  return (
    <DefaultLayout>
      {isLoading ? (
        <p className="text-xl bg-white h-96 flex items-center justify-center mt-8 rounded-2xl">
          <span>Loading...</span>
        </p>
      ) : (
        <div>
          <GradeTableList showHeading={true} data={gradeList} mutate={mutate} />
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
              disabled={currentPage === totalPages}
            >
              <MdChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </DefaultLayout>
  );
};

export default page;
