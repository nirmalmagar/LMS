"use client";
import React, { useEffect, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Cookies from "js-cookie";
import { accessToken } from "@/helpers/TokenHelper";
import useSWR from "swr";
import DateToString from "@/components/DateConverter/DateToString";

const BorrowHistory = () => {
  const [borrowHistory, setBorrowHistory] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState<number>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const user_id = Cookies.get("USER_ID");
  const { data, mutate } = useSWR(
    `${process.env.HOST}borrow/user-borrow-list/?user=${user_id}`
  );
  const BookLists = async () => {
    try {
      const response = await fetch(
        `${process.env.HOST}borrow/user-borrow-list/?user=${user_id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
          },
        }
      );
      const data = await response.json();
      setTotalPages(data?.total_pages);
      setCurrentPage(data?.current_page);
      setBorrowHistory(data?.results);
      if (data && borrowHistory) {
        setIsLoading(false);
      }
    } catch (e) {
      console.log("error", e);
    }
  };
  let totalPageArray = borrowHistory
    ? Array.from({ length: totalPages }, (_, index) => index + 1)
    : [];

  let paginationLinks =
    borrowHistory &&
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
  // useEffect(() => {
  //   BookLists();
  // }, [currentPage]);
  // console.log("borrowHistory", borrowHistory)
  return (
    <>
      {isLoading ? (
        <p className="text-xl bg-white h-96 flex items-center justify-center mt-8 rounded-2xl">
          <span>Loading...</span>
        </p>
      ) : (
        <div className="mt-8 rounded-3xl bg-white pb-2.5 px-2 pt-2 shadow-default sm:px-7.5 xl:pb-1">
          <div className="max-w-full overflow-x-auto">
            <table className="w-full text-sm table-auto">
              <thead>
                <tr className="border-b-2 text-left">
                  <th className="py-4 px-2 font-medium text-black">S.N</th>
                  <th className="min-w-[120px] py-4 px-2 font-medium text-black">
                    Title
                  </th>
                  <th className="min-w-[120px] py-4 px-2 font-medium text-black">
                    Borrow Date
                  </th>
                  <th className="max-w-[120px] py-4 px-2 font-medium text-black">
                    Due Date
                  </th>
                  <th className="min-w-[20px] py-4 px-2 font-medium text-black">
                    Status
                  </th>
                  <th className="min-w-[120px] py-4 px-2 font-medium text-black">
                    Over due
                  </th>
                  <th className="max-w-[120px] py-4 px-2 font-medium text-black">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.results?.map(
                  (borrowList: Record<string, any>, index: number) => {
                    return (
                      <tr key={index}>
                        <td className="border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                          <h5 className="font-medium text-black">
                            {index + 1}
                          </h5>
                        </td>
                        <td className="min-w-[80px] border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                          <p className="text-black" id="card_title">
                            {borrowList?.book?.title}
                          </p>
                        </td>
                        <td className="max-w-[160px] border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                          <p className="text-black " id="card_title">
                            <DateToString
                              inputDate={borrowList?.borrowed_date}
                            />
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                          <p className="text-black" id="card_title">
                            <DateToString inputDate={borrowList?.due_date} />
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                          <p className="text-black" id="card_title">
                            {borrowList?.borrow_status}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                          <p className="text-black" id="card_title">
                            {borrowList?.overdue}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                          <p className="text-black" id="card_title">
                            ----
                          </p>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
            {/* <div className="text-sm float-right m-4 flex items-center text-red-400 font-semibold">
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
            </div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default BorrowHistory;
