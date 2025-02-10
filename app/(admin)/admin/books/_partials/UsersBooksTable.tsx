"use client";
import React, { FormEvent, useEffect, useState } from "react";
import {
  TrashIcon,
  PencilSquareIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import useSWR from "swr";
import { toast } from "react-toastify";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { accessToken } from "@/helpers/TokenHelper";
import Image from "next/image";
import AddBookLists from "./AddBookLists";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { defaultFetcher } from "@/helpers/FetchHelper";
import Btn from "@/components/Btn";
import Modal from "@/components/Elements/Modal";
import InputField from "@/components/Form/InputForm";

interface ShowHeading {
  showHeading?: boolean;
  showMore?: boolean;
}

const UsersBooksTable: React.FC<ShowHeading> = ({ showHeading, showMore }) => {
  let heading = showHeading;
  let showLists = showMore;

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showPopUpModal, setShowPopUpModal] = useState<boolean>(false);
  const [editValue, setEditValue] = useState<Record<string, any>>({});
  const [error, setError] = useState<Record<string, any>>({});
  const [id, setId] = useState<number>();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [exportPopUpModal, setExportPopUpModal] = useState<boolean>(false);
  const [exportFormat, setExportFormat] = useState("csv");
  const [imageUrl, setImageUrl] = useState<string | null>("");
  // Handle individual checkbox change
  const handleCheckboxChange = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // image change handler
  const ImageChangeHandler = (e: any) => {
    const imageURL = e.target.files[0];
    setImageUrl(URL.createObjectURL(imageURL));
  };

  // books lists
  const {
    data: bookData,
    isLoading,
    mutate,
  } = useSWR(
    `${process.env.HOST}books/?query=&page=${currentPage} `,
    defaultFetcher
  );

  const allIds = bookData?.results?.map((book: any) => book.id) || [];
  const allSelected = selectedIds.length === allIds.length && allIds.length > 0;

  // Handle "Select All" checkbox change
  const handleSelectAll = () => {
    setSelectedIds(allSelected ? [] : allIds);
  };

  const { data: editBookList, mutate: editMutate } = useSWR(
    `${process.env.HOST}books/${id}/`,
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
  // handle close export
  function handleCloseExport() {
    setExportPopUpModal(false);
  }

  // -------------export book handle-----------------

  const handleExportBooks = async () => {
    const InputFileData = {
      format: exportFormat,
      books_id_list: selectedIds,
    };

    try {
      const response = await fetch(`${process.env.HOST}export-data/`, {
        method: "POST",
        body: JSON.stringify(InputFileData),
        headers: {
          Authorization: `Bearer ${accessToken()}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData?.error?.message ?? "Something went wrong!");
        setError(errorData);
        return;
      }
      if (response.ok) {
        handleCloseTap();
      }
      // ✅ Convert response to a Blob
      const blob = await response.blob();

      // ✅ Determine file extension based on format
      const fileExtension = exportFormat === "csv" ? "csv" : "xlsx";

      // ✅ Create a downloadable URL
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `exported_books.${fileExtension}`); // Set file name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url); // Free up memory

      toast.success("Data exported successfully");
      setShowPopUpModal(false);
      setError({});
      mutate();
    } catch (error) {
      console.error(error);
    }
  };

  let totalPageArray = bookData?.results
    ? Array.from({ length: bookData?.total_pages }, (_, index) => index + 1)
    : [];

  let paginationLinks =
    bookData?.results &&
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
  //   mutate();
  // }, [currentPage]);

  return (
    <>
      {/* edit modal */}
      <Modal
        show={showPopUpModal}
        handleClose={handleCloseTap}
        modalTitle="Edit Book"
        size="lg"
      >
        <form id="lead-form" onSubmit={handleEditBook}>
          <div className=" px-4 py-4 rounded-lg border border-gray-200">
            <div className=" flex flex-col gap-y-4">
              <div className="flex gap-x-4 items-center">
                <div className="relative w-12 h-12">
                  {imageUrl || editBookList?.cover ? (
                    <Image
                      src={imageUrl ? imageUrl : editBookList?.cover} // Use new image if available, else default
                      className="rounded"
                      fill
                      alt="Book Cover"
                    />
                  ) : (
                    <PhotoIcon
                      className="h-full w-full text-primary-500"
                      aria-hidden="true"
                    />
                  )}
                </div>

                {/* File Input Field */}
                <InputField
                  labelClassName="text-black"
                  className="flex flex-col"
                  label="Cover"
                  name="cover"
                  type="file"
                  onChange={ImageChangeHandler} // Calls the image handler function
                />

                {/* Remove Button */}
                {imageUrl && (
                  <Btn
                    onClick={() => {
                      setImageUrl(null); // Clears the selected image
                    }}
                    className="bg-red-500 text-white font-semibold mb-0"
                  >
                    Remove
                  </Btn>
                )}
              </div>

              <InputField
                labelClassName="text-black"
                label="Title"
                name="title"
                placeholder="enter title"
                type="text"
                // default={}
                defaultValue={editBookList?.title}
                fieldErrors={error?.title ?? []}
                onChange={(e: any) => {
                  handleFieldChange("title", e.target.value);
                }}
              />
              <InputField
                label="Author"
                name="author"
                placeholder="enter author"
                type="text"
                // default={}
                defaultValue={editBookList?.author}
                fieldErrors={error?.author ?? []}
                onChange={(e: any) => {
                  handleFieldChange("author", e.target.value);
                }}
              />
              <InputField
                label="Publisher"
                name="publisher"
                placeholder="enter publisher"
                type="text"
                // default={}
                defaultValue={editBookList?.publisher}
                fieldErrors={error?.publisher ?? []}
                onChange={(e: any) => {
                  handleFieldChange("publisher", e.target.value);
                }}
              />
              <InputField
                type="number"
                label="Pages"
                name="pages"
                placeholder="Enter pages"
                // default={}
                defaultValue={editBookList?.pages}
                fieldErrors={error?.pages ?? []}
                onChange={(e: any) => {
                  handleFieldChange("pages", e.target.value);
                }}
              />
              <InputField
                type="number"
                label="Price"
                name="price"
                placeholder="Enter price"
                // default={}
                defaultValue={editBookList?.price}
                fieldErrors={error?.price ?? []}
                onChange={(e: any) => {
                  handleFieldChange("price", e.target.value);
                }}
              />
              <InputField
                type="number"
                label="Quantity"
                name="quantity"
                placeholder="Enter quantity"
                // default={}
                defaultValue={editBookList?.quantity}
                fieldErrors={error?.quantity ?? []}
                onChange={(e: any) => {
                  handleFieldChange("quantity", e.target.value);
                }}
              />
              <InputField
                type="number"
                label="Isbn"
                name="isbn"
                placeholder="Enter isbn"
                // default={}
                defaultValue={editBookList?.isbn}
                fieldErrors={error?.isbn ?? []}
                onChange={(e: any) => {
                  handleFieldChange("isbn", e.target.value);
                }}
              />
              {/*
                <div className="flex gap-24">
                  <label htmlFor="">Genres</label>
                  <Multiselect
                    className="text-sm leading-4 w-full flex-1"
                    options={genres} // Data to display
                    displayValue="name" // The key to display (update based on your object structure)
                    onSelect={handleSelect} // Callback for when an item is selected
                    onRemove={handleRemove} // Callback for when an item is removed
                  /> 
                </div>
                */}
              <InputField
                type="textarea"
                label="Description"
                name="description"
                // default={}
                defaultValue={editBookList?.description}
                fieldErrors={error?.description ?? []}
                onChange={(e: any) => {
                  handleFieldChange("description", e.target.value);
                }}
              />
            </div>
          </div>

          <div className="bg-white sticky left-4 bottom-0 right-4 pt-6 border-gray-200 flex items-end  justify-between">
            <Btn
              outline="error"
              onClick={() => {
                setShowPopUpModal(false);
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

      {/* export modal */}
      <Modal
        show={exportPopUpModal}
        handleClose={handleCloseExport}
        modalTitle="Export Book"
        size="sm"
      >
        <div className="flex flex-col gap-4">
          <label className="text-sm font-medium">Select Export Format:</label>
          <select
            className="p-2 border border-gray-300 rounded-md"
            value={exportFormat}
            onChange={(e) => setExportFormat(e.target.value)} // Stores only one value
          >
            <option value="csv">CSV</option>
            <option value="xlsx">Excel (.xlsx)</option>
          </select>
        </div>

        <div className="bg-white sticky left-4 bottom-0 right-4 pt-6 border-gray-200 flex items-end  justify-between">
          <div></div>

          <div className="flex gap-x-4">
            <Btn
              onClick={handleExportBooks}
              className="bg-blue-600 text-white px-4 py-1 rounded-md cursor-pointer"
            >
              Export
            </Btn>
          </div>
        </div>
      </Modal>

      {isLoading ? (
        <p className="text-xl bg-white h-96 flex items-center justify-center mt-8 rounded-2xl">
          <span>Loading...</span>
        </p>
      ) : (
        <div className="mt-8 rounded-3xl bg-white pb-2.5 px-2 pt-2 shadow-default sm:px-7.5 xl:pb-1">
          <div className="relative">
            <div className="absolute top-4 right-28">
              <button
                onClick={() => setExportPopUpModal(true)}
                type="submit"
                className="text-sm py-1.5 px-4 bg-red-400 text-white rounded-lg"
              >
                Export
              </button>
            </div>
            {heading && <AddBookLists mutate={mutate} />}
          </div>
          <div className="max-w-full overflow-x-auto">
            <table className="w-full text-sm table-auto">
              <thead>
                <tr className="border-b-2 text-left">
                  <th className="py-4 px-2 font-medium text-black">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={allSelected}
                      onChange={handleSelectAll}
                    />
                    S.N
                  </th>
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
                {bookData?.results?.map(
                  (booksList: Record<string, any>, index: number) => {
                    return (
                      <tr key={index}>
                        <td className="border-b flex gap-x-2 border-[#eee] py-2 px-2 dark:border-strokedark">
                          <input
                            type="checkbox"
                            className="form-checkbox"
                            checked={selectedIds.includes(booksList?.id)}
                            onChange={() => handleCheckboxChange(booksList?.id)}
                          />
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
                        <td className="max-w-40 border-b border-[#eee] py-2 px-2 dark:border-strokedark">
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
                        <td className=" max-w-40 border-b border-[#eee] py-2 px-2 dark:border-strokedark">
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
                                <button
                                  onClick={() => openEditBox(booksList?.id)}
                                  className="ml-3"
                                >
                                  <PencilSquareIcon className="h-[18px] w-[18px] hover:text-blue-700" />
                                </button>
                              </p>
                            </td>
                          </>
                        )}
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
            {bookData?.results?.length >= 10 && (
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
                  disabled={currentPage === bookData?.total_pages}
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

export default UsersBooksTable;
