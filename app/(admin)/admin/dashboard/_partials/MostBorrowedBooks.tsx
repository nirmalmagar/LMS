"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import useSWR from "swr";
import { toast } from "react-toastify";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { accessToken } from "@/helpers/TokenHelper";
import HeadingText from "./HeadingText";
import Image from "next/image";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { defaultFetcher } from "@/helpers/FetchHelper";
import Btn from "@/components/Btn";
import Modal from "@/components/Elements/Modal";
import InputField from "@/components/Form/InputForm";

interface ShowHeading {
  showHeading?: boolean;
  showMore?: boolean;
}

const MostBorrowedBooks: React.FC<ShowHeading> = ({
  showHeading,
  showMore,
}) => {
  let heading = showHeading;
  let showLists = showMore;

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showPopUpModal, setShowPopUpModal] = useState<boolean>(false);
  const [editValue, setEditValue] = useState<Record<string, any>>({});
  const [error, setError] = useState<Record<string, any>>({});
  const [id, setId] = useState<number>();

  const { data: editBookList, mutate: editMutate } = useSWR(
    `${process.env.HOST}books/${id}/`,
    defaultFetcher
  );

  // books lists
  const {
    data: borrowBooks,
    isLoading,
    mutate,
  } = useSWR(
    `${process.env.HOST}most-borrowed-books/?page=${currentPage} `,
    defaultFetcher
  );

  const openEditBox = (editId: number) => {
    setId(editId);
    setShowPopUpModal(true);
  };

  // edit handler
  const handleEditBook = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      const response = await fetch(`${process.env.HOST}books/${id}/`, {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${accessToken()}`,
          Accept: "application/json",
        },
      });
      const data = response.json();
      if (response.ok) {
        toast.success("update book successfully");
        editMutate();
        mutate();
        setShowPopUpModal(false);
      } else {
        setError(data);
        toast.error("something went wrong");
      }
    } catch (e) {
      console.error("error ", e);
    }
  };

  const handleFieldChange = (key: string, value: any) => {
    if (key && value) {
      setEditValue((prev) => ({ ...prev, [key]: value }));
    }
  };

  function handleCloseTap() {
    setShowPopUpModal(false);
    setEditValue({});
  }

  let totalPageArray = borrowBooks?.results
    ? Array.from({ length: borrowBooks?.total_pages }, (_, index) => index + 1)
    : [];

  let paginationLinks =
    borrowBooks?.results &&
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
          <HeadingText heading="Most Borrowed Books" />
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
                  {/* {showLists && (
                    <> */}
                      <th className="min-w-[40px] py-4 px-2 font-medium text-black">
                        Price
                      </th>
                      <th className="min-w-[40px] py-4 px-2 font-medium text-black">
                        Pages
                      </th>
                      {/* <th className="min-w-[20px] py-4 px-2 font-medium text-black">
                        Action
                      </th> */}
                    {/* </>
                  )} */}
                </tr>
              </thead>
              <tbody>
                {borrowBooks?.results
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
                            {booksList?.cover ? (
                              <Image
                                src={booksList?.cover}
                                className="rounded"
                                fill
                                sizes="fit"
                                style={{ objectFit: "cover" }}
                                alt={booksList?.title}
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
                            {booksList.title}
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

                        {/* {showLists && (
                          <> */}
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
                          {/* </>
                        )} */}
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            {borrowBooks?.results?.length >= 10 && (
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
                  disabled={currentPage === borrowBooks?.total_pages}
                >
                  <MdChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MostBorrowedBooks;
