"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import useSWR from "swr";
import { toast } from "react-toastify";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { accessToken } from "@/helpers/TokenHelper";
import Image from "next/image";
import AddBookLists from "../../books/_partials/AddBookLists";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { defaultFetcher } from "@/helpers/FetchHelper";
import Btn from "@/components/Btn";
import Modal from "@/components/Elements/Modal";
import InputField from "@/components/Form/InputForm";
import AddGenre from "./AddGenres";

interface ShowHeading {
  showHeading?: boolean;
  showMore?: boolean;
}

const GenresTableList: React.FC<ShowHeading> = ({ showHeading, showMore }) => {
  let heading = showHeading;
  let showLists = showMore;

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showPopUpModal, setShowPopUpModal] = useState<boolean>(false);
  const [editValue, setEditValue] = useState<Record<string, any>>({});
  const [error, setError] = useState<Record<string,any>>({});
  const [id, setId] = useState<number>();

  const GenresListURL = `${process.env.HOST}genres/?page=${currentPage}`;
  const {
    data: genresData,
    isLoading,
    mutate,
  } = useSWR(GenresListURL, defaultFetcher);

  // edit genres
  const { data: editBookList , mutate:editMutate } = useSWR(
    `${process.env.HOST}genres/${id}`,
    defaultFetcher
  );

  // delete modal
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
            const response = await fetch(`${process.env.HOST}genres/${id}/`, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${accessToken()}`,
                "Content-Type": "application/json",
                Accept: "application/json", // Fixed typo here
              },
            });
            if (response.ok) {
              toast.success("Genre removed successfully.");
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

  const openEditBox = (editId: number) => {
    setId(editId);
    setShowPopUpModal(true);
  };

  // handle close tap
  function handleCloseTap() {
    setShowPopUpModal(false);
    setEditValue({});
    setError({});
  }

  // edit handler
  const handleEditBook = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      const response = await fetch(`${process.env.HOST}genres/${id}/`, {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${accessToken()}`,
          Accept: "application/json",
        },
      });
      const data = response.json();
      if (response.ok) {
        toast.success("update genres successfully");
        handleCloseTap();
        mutate?.();
        editMutate();
      }
      else{
        setError(data);
      }
    } catch (e) {
      console.error("error ", e);
    }
  };


  let totalPageArray = genresData?.results
    ? Array.from({ length: genresData?.total_pages }, (_, index) => index + 1)
    : [];

  let paginationLinks =
    genresData?.results &&
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
    {/* edit Model popup  */}
    <Modal
        show={showPopUpModal}
        handleClose={handleCloseTap}
        modalTitle="Add Grade"
        size="lg"
      >
        <form id="lead-form" onSubmit={handleEditBook}>
          <div className=" px-4 py-4 rounded-lg border border-gray-200">
            <InputField
              type="text"
              label="Grade"
              name="name"
              placeholder="enter grade"
              defaultValue={editBookList?.name}
              fieldErrors={error?.name ?? []}
              // onChange={(e: any) => {
              //   handleFieldChange("name", e.target.value);
              // }}
            />
          </div>

          <div className="bg-white sticky left-4 bottom-0 right-4 pt-6 border-gray-200 flex items-end  justify-between">
            <Btn
              outline="error"
              onClick={()=>handleCloseTap()}
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
        <div className="mt-8 rounded-3xl bg-white pb-2.5 px-2 pt-2 shadow-default sm:px-7.5 xl:pb-1">
          {heading && <AddGenre mutate={mutate} />}
          <div className="max-w-full overflow-x-auto">
            <table className="w-full text-sm table-auto">
              <thead>
                {/* dark:bg-meta-4 */}
                <tr className="bg-gray-200 text-left">
                  <th className=" px-4 py-4 font-medium text-black xl:pl-11">
                    S.N
                  </th>
                  <th className="min-w-[120px] px-4 py-4 font-medium text-black">
                    Name
                  </th>
                  <th className="min-w-[120px] px-4 py-4 font-medium text-black">
                    Created Date
                  </th>
                  <th className="min-w-[120px] px-4 py-4 font-medium text-black">
                    Modified Date
                  </th>
                  <th className="px-4 py-4 font-medium text-black">
                    Creator Name
                  </th>
                  <th className="min-w-[120px] px-4 py-4 font-medium text-black">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {genresData?.results?.map(
                  (genresList: Record<string, any>, index: number) => {
                    return (
                      <tr key={index}>
                        <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                          <h5 className="font-medium text-black">
                            {index + 1}
                          </h5>
                        </td>

                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                          <p className="text-black">{genresList.name}</p>
                        </td>

                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                          <p className="text-black">{genresList?.created_on}</p>
                        </td>
                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                          <p className="text-black">
                            {genresList?.modified_on}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                          <p className="text-black">
                            {genresList?.created_by
                              ? genresList?.created_by
                              : genresList?.name}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                          <p className="text-black text-center">
                            <button
                              className="hover:text-red"
                              onClick={() => showSwal(genresList?.id)}
                            >
                              {/* <EllipsisHorizontalIcon className="ml-2 cursor-pointer w-8 h-6" /> */}
                              <TrashIcon className="h-[18px] w-[18px]" />
                            </button>
                            <button
                              className="ml-3"
                              onClick={() => openEditBox(genresList?.id)}
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
                disabled={currentPage === genresData?.total_pages}
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

export default GenresTableList;
