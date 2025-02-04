"use client";
import React, { FormEvent, useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import { toast } from "react-toastify";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { accessToken } from "@/helpers/TokenHelper";
import AddFine from "./AddFine";
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
import FineCollectionName from "@/helpers/FineCollectionName";

interface ShowHeading {
  showHeading?: boolean;
  showMore?: boolean;
}

const FineTableList: React.FC<ShowHeading> = ({ showHeading, showMore }) => {
  let heading = showHeading;
  let showLists = showMore;

  // const [showMore, setShowMore] = useState<boolean>(false);
  const [fineList, setFineList] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState<number>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [fineId, setFineId] = useState<number>();
  const [showPopUpModal, setShowPopUpModal] = useState<boolean>(false);
  const [selectValues, setSelectValues] = useState<Record<string, any>>({});
  const [error, setError] = useState<Record<string, any>>({});

  const {
    data: fineData,
    isLoading,
    mutate,
  } = useSWR(`${process.env.HOST}fine/?page=${currentPage}`, defaultFetcher);

  // edit id list
  const FineURL = `${process.env.HOST}fine/${fineId}`;
  const { data: fineIdList, mutate: editMutate } = useSWR(
    FineURL,
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
            const response = await fetch(`${process.env.HOST}fine/${id}/`, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${accessToken()}`,
                "Content-Type": "application/json",
                Accept: "application/json", // Fixed typo here
              },
            });
            if (response.ok) {
              toast.success("Fine removed successfully.");
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
    setFineId(id);
  };
  const handleCloseTap = () => {
    setShowPopUpModal(false);
  };
  // edit handle submit
  const handleEditFine = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      const response = await fetch(`${process.env.HOST}fine/${fineId}/`, {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${accessToken()}`,
          Accept: "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Fine update successfully ");
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

  // fetch fine lists
  // const FineList = async () => {
  //   setIsLoading(true);
  //   try {
  //     const response = await fetch(
  //       `${process.env.HOST}fine/?page=${currentPage}`,
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
  //     setFineList(data?.results);
  //     setIsLoading(false);
  //     mutate();
  //   } catch (e) {
  //     console.log("error", e);
  //     setIsLoading(false);
  //   }
  // };

  // pagination number lists in array
  let totalPageArray = fineList
    ? Array.from({ length: totalPages }, (_, index) => index + 1)
    : [];

  // pagination
  let paginationLinks =
    fineList &&
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
    if (fineData) {
      setCurrentPage(fineData?.current_page || 1);
      setTotalPages(fineData?.total_pages || 1);
    }
  }, [fineData]);
  return (
    <>
      {/* edit Model popup  */}
      <Modal
        show={showPopUpModal}
        handleClose={handleCloseTap}
        modalTitle="Edit Fine"
        size="lg"
      >
        <form id="lead-form" onSubmit={handleEditFine}>
          <div className=" px-4 py-4 rounded-lg border border-gray-200">
            <InputField
              type="text"
              label="Borrow Id"
              name="borrow"
              defaultValue={fineIdList?.borrow?.id}
              fieldErrors={error?.borrow ?? []}
            />
            <InputField
              type="text"
              label="Amount"
              name="amount"
              // options={libraryOptions}
              value={selectValues?.amount}
              defaultValue={fineIdList?.amount}
              fieldErrors={error?.amount ?? []}
              // onChange={(e) => {
              //   handleSelectChange("amount", {
              //     value: e.target.value,
              //   });
              // }}
            />
            <InputField
              type="text"
              label="Payment Method"
              name="payment_method"
              placeholder="cash , esewa or khalti"
              defaultValue={fineIdList?.payment_method}
              fieldErrors={error?.cash ?? []}
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
      {/* <FineCollectionName /> */}
      {isLoading ? (
        <p className="text-xl bg-white h-96 flex items-center justify-center mt-8 rounded-2xl">
          <span>Loading...</span>
        </p>
      ) : ( 
        <div className="mt-8 max-w-full rounded-3xl bg-white pb-2.5 px-2 pt-2 shadow-default sm:px-7.5 xl:pb-1">
          {heading && <AddFine mutate={mutate} />}
          <div className="max-w-full overflow-x-auto">
            <table className="w-full text-sm table-auto">
              <thead>
                <tr className="border-b-2 text-left">
                  <th className="py-4 px-2 font-medium text-black">S.N</th>
                  <th className="min-w-[20px] py-4 px-2 font-medium text-black">
                    Borrower
                  </th>
                  <th className="min-w-[20px] py-4 px-2 font-medium text-black">
                    Amount
                  </th>
                  <th className="min-w-[20px] py-4 px-2 font-medium text-black">
                    Payment Method
                  </th>
                  <th className="min-w-[20px] py-4 px-2 font-medium text-black">
                    Status
                  </th>
                  <th className="min-w-[20px] py-4 px-2 font-medium text-black">
                  Transaction Id
                  </th>
                  <th className="min-w-[20px] py-4 px-2 font-medium text-black">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {fineData?.results?.map(
                  (fineItem: Record<string, any>, index: number) => {
                    return (
                      <tr key={index}>
                        <td className="border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                          <h5 className="font-medium text-black">
                            {index + 1}
                          </h5>
                        </td>
                        <td className="min-w-[80px] border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                          <p className="text-black" id="card_title">
                            {fineItem?.borrow?.borrower}
                          </p>
                        </td>
                        <td className="min-w-[80px] border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                          <p className="text-black" id="card_title">
                            {fineItem?.amount}
                          </p>
                        </td>
                        <td className="min-w-[80px] border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                          <p className="text-black" id="card_title">
                            {fineItem?.payment_method}
                          </p>
                        </td>
                        <td className="min-w-[80px] border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                          <p className="text-black" id="card_title">
                            {fineItem?.status}
                          </p>
                        </td>
                        <td className="min-w-[80px] border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                          <p className="text-black" id="card_title">
                            {fineItem?.transaction_id}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                          <p className="text-black">
                            <button
                              className="hover:text-red"
                              onClick={() => showSwal(fineItem?.id)}
                            >
                              <TrashIcon className="h-[18px] w-[18px] hover:text-red-500" />
                            </button>
                            <button
                              className="ml-3"
                              onClick={() => editIconBox(fineItem?.id)}
                            >
                              <PencilSquareIcon className="h-[18px] w-[18px] hover:text-blue-700" />
                            </button>
                          </p>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
            {fineData?.results?.length >= 10 && (
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

export default FineTableList;
