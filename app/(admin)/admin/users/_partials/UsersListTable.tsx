"use client";
import React, { FormEvent, useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import { toast } from "react-toastify";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { accessToken } from "@/helpers/TokenHelper";
import AddUser from "./AddUser";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import {
  PencilSquareIcon,
  TrashIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import Modal from "@/components/Elements/Modal";
import InputField from "@/components/Form/InputForm";
import Btn from "@/components/Btn";
import { defaultFetcher } from "@/helpers/FetchHelper";
import SelectField from "@/components/Form/SelectField";
import { collectionToOptions } from "@/helpers/CollectionOption";
import DateToString from "@/components/DateConverter/DateToString";
import { LibraryId } from "@/components/IdToName/IdToName";
import ChangePassword from "./ChangePassword";
interface ShowHeading {
  showHeading?: boolean;
  showMore?: boolean;
}

const UserListTable: React.FC<ShowHeading> = ({ showHeading, showMore }) => {
  let heading = showHeading;
  let showLists = showMore;

  // const [showMore, setShowMore] = useState<boolean>(false);
  const [userList, setUserList] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState<number>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [userId, setUserId] = useState<number>();
  const [showPopUpModal, setShowPopUpModal] = useState<boolean>(false);
  const [selectValues, setSelectValues] = useState<Record<string, any>>({});
  const [error, setError] = useState<Record<string, any>>({});

  const {
    data: userData,
    isLoading,
    mutate,
  } = useSWR(`${process.env.HOST}user/?page=${currentPage}`, defaultFetcher);
  // edit id list
  const UserURL = `${process.env.HOST}user/${userId}/`;
  const { data: userIdList, mutate: editMutate } = useSWR(
    UserURL,
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
            const response = await fetch(`${process.env.HOST}user/${id}/`, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${accessToken()}`,
                "Content-Type": "application/json",
                Accept: "application/json", // Fixed typo here
              },
            });
            if (response.ok) {
              toast.success("User removed successfully.");
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
    setUserId(id);
  };
  const handleCloseTap = () => {
    setShowPopUpModal(false);
  };
  // edit handle submit
  const handleEditUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      const response = await fetch(`${process.env.HOST}user/${userId}/`, {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${accessToken()}`,
          Accept: "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("User update successfully ");
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

  let totalPageArray = userList
    ? Array.from({ length: totalPages }, (_, index) => index + 1)
    : [];

  // pagination
  let paginationLinks =
    userList &&
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
    if (userData) {
      setCurrentPage(userData.current_page || 1);
      setTotalPages(userData.total_pages || 1);
    }
  }, [userData]);
  return (
    <>
      {/* edit Model popup  */}
      <Modal
        show={showPopUpModal}
        handleClose={handleCloseTap}
        modalTitle="Edit User"
        size="lg"
      >
        <form id="lead-form" onSubmit={handleEditUser}>
          <div className=" px-4 py-4 rounded-lg border border-gray-200">
            <InputField
              type="text"
              label="First Name"
              name="first_name"
              placeholder="enter first name"
              fieldErrors={error?.first_name ?? []}
              defaultValue={userIdList?.first_name}
              // onChange={(e: any) => handleFieldChange("first_name", e.target.value)}
            />
            <InputField
              type="text"
              label="Middle Name"
              name="middle_name"
              placeholder="enter middle name"
              fieldErrors={error?.middle_name ?? []}
              defaultValue={userIdList?.middle_name}
              // onChange={(e: any) => handleFieldChange("middle_name", e.target.value)}
            />
            <InputField
              type="text"
              label="Last Name"
              name="last_name"
              placeholder="enter last name"
              fieldErrors={error?.last_name ?? []}
              defaultValue={userIdList?.last_name}
              // onChange={(e: any) => handleFieldChange("last_name", e.target.value)}
            />
            <InputField
              type="email"
              label="Email"
              name="email"
              placeholder="enter email"
              fieldErrors={error?.email ?? []}
              defaultValue={userIdList?.email}
              // onChange={(e: any) => handleFieldChange("email", e.target.value)}
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
        <div className="mt-8 max-w-[800px] rounded-3xl bg-white pb-2.5 px-2 pt-2 shadow-default sm:px-7.5 xl:pb-1">
          {heading && <AddUser mutate={mutate} />}
          <div className="max-w-full overflow-x-auto">
            <table className="w-full text-sm table-auto">
              <thead>
                <tr className="border-b-2 text-left">
                  <th className="py-4 px-2 font-medium text-black">S.N</th>
                  <th className="min-w-[20px] py-4 px-2 font-medium text-black">
                    Name
                  </th>
                  <th className="min-w-[20px] py-4 px-2 font-medium text-black">
                    Email
                  </th>
                  <th className="min-w-[20px] py-4 px-2 font-medium text-black">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {userData?.results?.map(
                  (userList: Record<string, any>, index: number) => {
                    return (
                      <tr key={index}>
                        <td className="border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                          <h5 className="font-medium text-black">
                            {index + 1}
                          </h5>
                        </td>
                        <td className="min-w-[80px] border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                          <p className="text-black" id="card_title">
                            {userList?.name}
                          </p>
                        </td>
                        <td className="min-w-[80px] border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                          <p className="text-black" id="card_title">
                            {userList?.email}
                          </p>
                        </td>
                        <td className="border-b flex border-[#eee] py-2 px-2 dark:border-strokedark">
                          <div className="text-black">
                            <button
                              className="hover:text-red"
                              onClick={() => showSwal(userList?.id)}
                            >
                              <TrashIcon className="h-[18px] w-[18px] hover:text-red-500" />
                            </button>
                            <button
                              className="ml-3"
                              onClick={() => editIconBox(userList?.id)}
                            >
                              <PencilSquareIcon className="h-[18px] w-[18px] hover:text-blue-700" />
                            </button>
                            <ChangePassword userId={userList?.id} />
                          </div>
                          {/* <p className="text-xs bg-blue-500 ml-2 px-1 py-1 rounded-md text-white">change password</p> */}
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
            {userData?.results?.length >= 10 && (
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

export default UserListTable;
