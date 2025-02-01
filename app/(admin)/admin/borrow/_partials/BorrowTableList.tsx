"use client";
import React, { FormEvent, useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import { toast } from "react-toastify";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { accessToken } from "@/helpers/TokenHelper";
import AddBorrow from "./AddBorrow";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import Modal from "@/components/Elements/Modal";
import InputField from "@/components/Form/InputForm";
import Btn from "@/components/Btn";
import { defaultFetcher } from "@/helpers/FetchHelper";
import SelectField from "@/components/Form/SelectField";
import { collectionToOptions } from "@/helpers/CollectionOption";
import DateToString from "@/components/DateConverter/DateToString";
import { LibraryId } from "@/components/IdToName/IdToName";

interface ShowHeading {
  showHeading?: boolean;
  showMore?: boolean;
}

const BorrowTableList: React.FC<ShowHeading> = ({ showHeading, showMore }) => {
  let heading = showHeading;
  let showLists = showMore;

  // const [showMore, setShowMore] = useState<boolean>(false);
  const [borrowList, setBorrowList] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState<number>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [borrowId, setBorrowId] = useState<number>();
  const [showPopUpModal, setShowPopUpModal] = useState<boolean>(false);
  const [selectValues, setSelectValues] = useState<Record<string, any>>({});
  const [error, setError] = useState<Record<string, any>>({});

  const {
    data: borrowData,
    isLoading,
    mutate,
  } = useSWR(`${process.env.HOST}borrow/?page=${currentPage}`, defaultFetcher);

  // edit id list
  const BorrowURL = `${process.env.HOST}borrow/${borrowId}`;
  const { data: borrowIdList, mutate: editMutate } = useSWR(
    BorrowURL,
    defaultFetcher
  );

  // library section lists
  const { data: libraryData } = useSWR(
    `${process.env.HOST}library-sections/`,
    defaultFetcher
  );
  const libraryOptions = collectionToOptions(
    libraryData?.results ? libraryData?.results : []
  );

  // change handler
  function handleSelectChange(name: string, choice: Record<string, any>) {
    const key = name;
    const value = choice?.value;
    setSelectValues((prev) => ({ ...prev, [key]: value }));
  }
  // delete popup model
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
            const response = await fetch(`${process.env.HOST}borrow/${id}/`, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${accessToken()}`,
                "Content-Type": "application/json",
                Accept: "application/json", // Fixed typo here
              },
            });
            if (response.ok) {
              toast.success("Borrow removed successfully.");
              mutate();
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

  // edit icons box
  const editIconBox = (id: number) => {
    setShowPopUpModal(true);
    setBorrowId(id);
  };
  const handleCloseTap = () => {
    setShowPopUpModal(false);
  };
  // edit handle submit
  const handleEditBorrow = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      const response = await fetch(`${process.env.HOST}borrow/${borrowId}/`, {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${accessToken()}`,
          Accept: "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Borrow update successfully ");
        setShowPopUpModal(false);
        editMutate();
        mutate();
      } else {
        setError(data);
      }
    } catch (e: any) {
      console.error(e);
    }
  };

  // fetch borrow lists
  // const BorrowList = async () => {
  //   setIsLoading(true);
  //   try {
  //     const response = await fetch(
  //       `${process.env.HOST}borrow/?page=${currentPage}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken()}`,
  //           Accept: "application/json",
  //         },
  //       }
  //     );
  //     const data = await response.json();
  //     setTotalPages(data?.total_pages);
  //     setCurrentPage(data?.current_page);
  //     setBorrowList(data?.results);
  //     setIsLoading(false);
  //     mutate();
  //   } catch (e) {
  //     console.log("error", e);
  //     setIsLoading(false);
  //   }
  // };

  // pagination number lists in array
  let totalPageArray = borrowList
    ? Array.from({ length: totalPages }, (_, index) => index + 1)
    : [];

  // pagination
  let paginationLinks =
    borrowList &&
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
    if (borrowData) {
      setCurrentPage(borrowData?.current_page || 1);
      setTotalPages(borrowData?.total_pages || 1);
    }
  }, [borrowData]);
  return (
    <>
      {/* edit Model popup  */}
      <Modal
        show={showPopUpModal}
        handleClose={handleCloseTap}
        modalTitle="Edit Borrow"
        size="lg"
      >
        <form id="lead-form" onSubmit={handleEditBorrow}>
          <div className=" px-4 py-4 rounded-lg border border-gray-200">
            <InputField
              type="text"
              label="Number"
              name="number"
              defaultValue={borrowIdList?.number}
              fieldErrors={error?.number ?? []}
            />
            <SelectField
              label="section"
              name="section"
              options={libraryOptions}
              value={selectValues?.section}
              defaultValue={borrowIdList?.section?.id}
              fieldErrors={error?.section ?? []}
              onChange={(e) => {
                handleSelectChange("section", {
                  value: e.target.value,
                });
              }}
            />
            <InputField
              type="text"
              label="Description"
              name="description"
              defaultValue={borrowIdList?.description}
              fieldErrors={error?.description ?? []}
            />
          </div>
          <div className="bg-white sticky left-4 bottom-0 right-4 pt-6 border-gray-200 flex items-end  justify-between">
            <Btn
              outline="error"
              onClick={() => {
                setShowPopUpModal(false);
                setError({});
              }}
            >
              Cancel
            </Btn>

            <div className="flex gap-x-4">
              <Btn type="submit" className="bg-blue-600 text-white">
                Edit
              </Btn>
            </div>
          </div>
        </form>
      </Modal>

      {isLoading ? (
        <p className="text-xl bg-white h-96 flex items-center justify-center mt-8 rounded-2xl">
          <span>Loading...</span>
        </p>
      ) : (
        <div className="mt-8 max-w-full rounded-3xl bg-white pb-2.5 px-2 pt-2 shadow-default sm:px-7.5 xl:pb-1">
          {heading && <AddBorrow mutate={mutate} />}
          <div className="max-w-full overflow-x-auto">
            <table className="w-full text-sm table-auto">
              <thead>
                <tr className="border-b-2 text-left">
                  <th className="py-4 px-2 font-medium text-black">S.N</th>
                  <th className="min-w-[20px] py-4 px-2 font-medium text-black">
                    Books
                  </th>
                  <th className="min-w-[20px] py-4 px-2 font-medium text-black">
                    Borrower
                  </th>
                  <th className="min-w-[20px] py-4 px-2 font-medium text-black">
                    Borrowed Date
                  </th>
                  <th className="min-w-[20px] py-4 px-2 font-medium text-black">
                    Due Date
                  </th>
                  <th className="min-w-[20px] py-4 px-2 font-medium text-black">
                    Returned Date
                  </th>
                  <th className="min-w-[20px] py-4 px-2 font-medium text-black">
                    Borrow Status
                  </th>
                  {/* <th className="min-w-[20px] py-4 px-2 font-medium text-black">
                    Action
                  </th> */}
                </tr>
              </thead>
              <tbody>
                {borrowData?.results?.map(
                  (borrowItem: Record<string, any>, index: number) => {
                    return (
                      <tr key={index}>
                        <td className="border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                          <h5 className="font-medium text-black">
                            {index + 1}
                          </h5>
                        </td>
                        <td className="min-w-[80px] border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                          <p className="text-black" id="card_title">
                            {borrowItem?.book?.title}
                          </p>
                        </td>
                        <td className="min-w-[80px] border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                          <p className="text-black" id="card_title">
                            {borrowItem?.borrower?.name}
                          </p>
                        </td>
                        <td className="min-w-[80px] border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                          <p className="text-black" id="card_title">
                            <DateToString
                              inputDate={borrowItem?.borrowed_date}
                            />
                          </p>
                        </td>
                        <td className="min-w-[80px] border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                          <p className="text-black" id="card_title">
                            <DateToString inputDate={borrowItem?.due_date} />
                          </p>
                        </td>
                        <td className="min-w-[80px] border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                          <p className="text-black" id="card_title">
                            {borrowItem?.returned_date ? (
                              <DateToString
                                inputDate={borrowItem?.returned_date}
                              />
                            ) : (
                              "---"
                            )}
                          </p>
                        </td>
                        <td className="min-w-[80px] border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                          <p className="text-black" id="card_title">
                            {borrowItem?.borrow_status}
                          </p>
                        </td>
                        {/* <td className="border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                          <p className="text-black">
                            <button
                              className="hover:text-red"
                              onClick={() => showSwal(borrowItem?.id)}
                            >
                              <TrashIcon className="h-[18px] w-[18px] hover:text-red-500" />
                            </button>
                            <button
                              className="ml-3"
                              onClick={() => editIconBox(borrowItem?.id)}
                            >
                              <PencilSquareIcon className="h-[18px] w-[18px] hover:text-blue-700" />
                            </button>
                          </p>
                        </td> */}
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
            {borrowData?.results?.length >= 10 && (
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
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default BorrowTableList;
