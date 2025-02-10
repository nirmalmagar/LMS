import React, { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const [buttonsArray, setButtonsArray] = useState<(number | string)[]>([]);

  // const updateVisiblePages = (page: number) => {
  //   let pages: (number | string)[] = [];

  //   if (totalPages <= 6) {
  //     pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  //   } else {
  //     // Reset the pages array
  //     pages = [];

  //     pages.push(1);

  //     if (page > 4) {
  //       pages.push("start-ellipsis");
  //     }

  //     const startPage = Math.max(Math.min(page - 2, totalPages - 5), 2);
  //     const endPage = Math.min(startPage + 4, totalPages - 1);

  //     for (let i = startPage; i <= endPage; i++) {
  //       pages.push(i);
  //     }

  //     if (endPage < totalPages - 1) {
  //       pages.push("end-ellipsis");
  //     }

  //     pages.push(totalPages);
  //   }

  //   setButtonsArray(pages);
  // };

  const handleEllipsisClick = (type: string) => {
    let newPage;

    if (type === "start-ellipsis") {
      newPage = Math.max(2, (buttonsArray[1] as number) - 1);
    } else {
      newPage = Math.min(
        totalPages - 1,
        (buttonsArray[buttonsArray.length - 2] as number) + 1
      );
    }

    if (newPage !== currentPage) {
      // updateVisiblePages(newPage);
      onPageChange(newPage);
    }
  };

  const renderPageNumbers = () => {
    return buttonsArray.map((button, index) => {
      if (button === "start-ellipsis" || button === "end-ellipsis") {
        return (
          <span
            key={`${button}-${index}`}
            // onClick={() => handleEllipsisClick(button as string)}
            className="px-1 md:px-2 py-1 text-black"
          >
            ...
          </span>
        );
      } else {
        return (
          <button
            key={`page-${button}`}
            onClick={() => onPageChange(button as number)}
            className={`px-1 md:px-2 py-1 rounded-md border border-transparent transition-all min-w-6 ${
              button === currentPage
                ? "bg-primary-500 text-black"
                : "hover:border-primary-500"
            }`}
          >
            {button}
          </button>
        );
      }
    });
  };

  useEffect(() => {
    // updateVisiblePages(currentPage);
  }, [currentPage, totalPages ]);
  return (
    <>
      {currentPage === 1 && totalPages === 1 ? (
        ""
      ) : (
        <div className="flex items-center float-right">
          <button
            disabled={currentPage - 1 <= 0}
            onClick={() => onPageChange(currentPage - 1)}
          >
            <ChevronLeftIcon className="h-3 cursor-pointer dark:text-white" />
          </button>
          <div className="flex items-center dark:text-white justify-center gap-1 md:gap-2 text-sm md:mx-2">
            {renderPageNumbers()}
          </div>
          <button
            disabled={currentPage >= totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            className=""
          >
            <ChevronRightIcon className="h-3 cursor-pointer dark:text-white" />
          </button>
        </div>
      )}
    </>
  );
};

export default Pagination;
