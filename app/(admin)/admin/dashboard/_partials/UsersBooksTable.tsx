"use client";
import React, { useEffect, useState } from "react";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import useSWR, { mutate } from "swr";
import { toast } from "react-toastify";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { accessToken } from "@/helpers/TokenHelper";
import Image from "next/image";
import AddBookLists from "./AddBookLists";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

interface ShowHeading {
  showHeading?: boolean;
  showMore?: boolean;
}

const UsersBooksTable: React.FC<ShowHeading> = ({ showHeading, showMore }) => {
  let heading = showHeading;
  let showLists = showMore;
  // const [showMore, setShowMore] = useState<boolean>(false);
  const [bookLists, setBookLists] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState<number>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const showSwal = (id: string) => {
    withReactContent(Swal)
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, remove it!",
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await fetch(`${process.env.HOST}books/${id}/`, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${accessToken()}`,
                "Content-Type": "application/json",
                Accept: "application/json", // Fixed typo here
              },
            });
            if (response.ok) {
              toast.success("Genre removed successfully.");
              mutate(bookLists);
            } else {
              const result = await response.json();
              toast.error(result.message ?? "Something went wrong!");
            }
          } catch (err) {
            toast.error("Something went wrong!");
          }
        }
      });
  };
  const BookLists = async () => {
    // setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.HOST}books?page=${currentPage}`
      );
      const data = await response.json();
      setTotalPages(data?.total_pages);
      setCurrentPage(data?.current_page);
      setBookLists(data?.results);
      if (data && bookLists) {
        setIsLoading(false);
      }
    } catch (e) {
      console.log("error", e);
    }
  };
  let totalPageArray = bookLists
    ? Array.from({ length: totalPages }, (_, index) => index + 1)
    : [];

  let paginationLinks =
    bookLists &&
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
    BookLists();
  }, [currentPage]);

  return (
    <>
      {isLoading ? (
        <p className="text-xl bg-white h-96 flex items-center justify-center mt-8 rounded-2xl">
          <span>Loading...</span>
        </p>
      ) : (
        <div className="mt-8 rounded-3xl bg-white pb-2.5 px-2 pt-2 shadow-default sm:px-7.5 xl:pb-1">
          {heading && <AddBookLists />}
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
                  {showLists && (
                    <>
                      <th className="min-w-[40px] py-4 px-2 font-medium text-black">
                        Price
                      </th>
                      <th className="min-w-[40px] py-4 px-2 font-medium text-black">
                        Pages
                      </th>
                      <th className="min-w-[20px] py-4 px-2 font-medium text-black">
                        Action
                      </th>
                    </>
                  )}
                  
                </tr>
              </thead>
              <tbody>
                {bookLists
                  ?.slice(0, 5)
                  ?.map((booksList: Record<string, any>, index: number) => {
                    return (
                      <tr key={index}>
                        <td className="border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                          <h5 className="font-medium text-black">
                            {index + 1}
                          </h5>
                        </td>
                        <td className="border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                          <div className="relative w-12 h-12">
                            {booksList?.cover && <Image
                              src={booksList?.cover}
                              className="rounded"
                              fill
                              sizes="fit"
                              style={{ objectFit: 'cover' }} 
                              alt={booksList?.title}
                            />}
                          </div>
                        </td>
                        <td className="min-w-[80px] border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                          <p className="text-black" id="card_title">
                            {booksList.publisher}
                          </p>
                        </td>
                        <td className="max-w-[160px] border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                          <p className="text-black " id="card_title">
                            {booksList?.author}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                          <p className="text-black" id="card_title">
                            {booksList?.isbn}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                          <p className="text-black" id="card_title">
                            {booksList?.publisher}
                          </p>
                        </td>

                        {showLists && (
                          <>
                            <td className="border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                              <p className="text-black" id="card_title">
                                {booksList?.price}
                              </p>
                            </td>
                            <td className="border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                              <p className="text-black" id="card_title">
                                {booksList?.pages}
                              </p>
                            </td>
                            <td className="border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                              <p className="text-black">
                                <button
                                  className="hover:text-red"
                                  onClick={() => showSwal(booksList?.id)}
                                >
                                  <TrashIcon className="h-[18px] w-[18px] hover:text-red-500" />
                                </button>
                                <button className="ml-3">
                                  <PencilSquareIcon className="h-[18px] w-[18px] hover:text-blue-700" />
                                </button>
                              </p>
                            </td>
                          </>
                        )}
                      </tr>
                    );
                  })}
              </tbody>
            </table>
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
        </div>
      )}
    </>
  );
};

export default UsersBooksTable;
