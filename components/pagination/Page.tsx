"use client";
import React, { useEffect, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

interface PaginationProps{
  total_Pages:number;
  current_Page:number;
  results:Record<string,any>[];
  mutate:()=>void;
}

const page:React.FC<PaginationProps> = ({total_Pages, current_Page, results, mutate}) => {
  const [gradeListData, setGradeListData] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState<number>();
  const [currentPage, setCurrentPage] = useState<number>(1);
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
    setTotalPages(total_Pages);
    setCurrentPage(current_Page);
    setGradeListData(results);
    mutate?.();
  }, []);

  return (
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
  );
};

export default page;
