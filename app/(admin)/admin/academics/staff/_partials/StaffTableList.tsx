"use client";
import React, { FormEvent, useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import { toast } from "react-toastify";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { accessToken } from "@/helpers/TokenHelper";
import AddStaff from "./AddStaff";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import Modal from "@/components/Elements/Modal";
import InputField from "@/components/Form/InputForm";
import Btn from "@/components/Btn";
import { defaultFetcher } from "@/helpers/FetchHelper";

interface ShowHeading {
  showHeading?: boolean;
  showMore?: boolean;
}

const StaffTableList: React.FC<ShowHeading> = ({ showHeading, showMore }) => {
  let heading = showHeading;
  let showLists = showMore;

  // const [showMore, setShowMore] = useState<boolean>(false);
  const [staffList, setStaffList] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState<number>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [staffId, setStaffId] = useState<number>();
  const [showPopUpModal, setShowPopUpModal] = useState<boolean>(false);

  const StaffURL = `${process.env.HOST}staffs/${staffId}`;
  const { data: staffIdList } = useSWR(StaffURL, defaultFetcher);
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
            const response = await fetch(`${process.env.HOST}staffs/${id}/`, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${accessToken()}`,
                "Content-Type": "application/json",
                Accept: "application/json", // Fixed typo here
              },
            });
            if (response.ok) {
              toast.success("Staff removed successfully.");
              mutate(staffList);
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
    setStaffId(id);
  };
  const handleCloseTap = () => {
    setShowPopUpModal(false);
  };
  // edit handle submit
  const handleEditStaff = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      const response = await fetch(
        `${process.env.HOST}staffs/${staffId}/`,
        {
          method: "PUT",
          body: formData,
          headers: {
            Authorization: `Bearer ${accessToken()}`,
            Accept: "application/json",
          },
        }
      );
      // const data = await response.json();
      if (response.ok) {
        toast.success("Staff update successfully ");
      } else {
        toast.error("some thing went wrong");
      }
    } catch (e: any) {
      console.error(e);
    }
  };

  // fetch staff lists
  const StaffList = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.HOST}staffs/?page=${currentPage}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken()}`,
            Accept: "application/json",
          },
        }
      );
      const data = await response.json();
      setTotalPages(data?.total_pages);
      setCurrentPage(data?.current_page);
      setStaffList(data?.results);
      setIsLoading(false);
    } catch (e) {
      console.log("error", e);
      setIsLoading(false);
    }
  };

  // pagination number lists in array
  let totalPageArray = staffList
    ? Array.from({ length: totalPages }, (_, index) => index + 1)
    : [];

  // pagination
  let paginationLinks =
    staffList &&
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
    StaffList();
  }, [currentPage]);

  return (
    <>
      {/* edit Model popup  */}
      <Modal
        show={showPopUpModal}
        handleClose={handleCloseTap}
        modalTitle="Add Staff"
        size="lg"
      >
        <form id="lead-form" onSubmit={handleEditStaff}>
          <div className=" px-4 py-4 rounded-lg border border-gray-200">
            <InputField
              type="text"
              label="User"
              name="user"
              placeholder="Choose User"
              defaultValue={staffIdList?.user}
            />
            <InputField
              type="text"
              label="Employee name"
              name="employee_id"
              placeholder="Choose Employee name"
              defaultValue={staffIdList?.employee_id}
            />
            <InputField
              type="text"
              label="Department"
              name="department"
              placeholder="Choose Department"
              defaultValue={staffIdList?.department}
            />
            <InputField
              type="text"
              label="Role"
              name="role"
              placeholder="Enter role"
              defaultValue={staffIdList?.role}
            />
            <InputField
              type="textarea"
              label="Authorized section"
              name="authorized_sections"
              placeholder="Choose Authorized section"
              defaultValue={staffIdList?.authorized_sections}
            />
            <InputField
              type="text"
              label="Tasks"
              name="tasks"
              placeholder="Enter tasks"
              defaultValue={staffIdList?.tasks}
            />
            <InputField
              type="number"
              label="borrowing days"
              name="borrowing_period_days"
              placeholder="enter grade"
              defaultValue={staffIdList?.borrowing_period_days}
            />
          </div>
          <div className="bg-white sticky left-4 bottom-0 right-4 pt-6 border-gray-200 flex items-end  justify-between">
            <Btn
              outline="error"
              onClick={() => {
                setShowPopUpModal(false);
                // setInputFieldValue({});
              }}
            >
              Cancel
            </Btn>

            <div className="flex gap-x-4">
              <Btn
                type="submit"
                className="bg-blue-600 text-white"
                onClick={() => {
                  setShowPopUpModal(false);
                  // setInputFieldValue({});
                }}
              >
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
          {heading && <AddStaff />}
          <div className="max-w-full overflow-x-auto">
            <table className="w-full text-sm table-auto">
              <thead>
                <tr className="border-b-2 text-left">
                  <th className="py-4 px-2 font-medium text-black">S.N</th>
                  <th className="min-w-[20px] py-4 px-2 font-medium text-black">
                    User
                  </th>
                  <th className="min-w-[20px] py-4 px-2 font-medium text-black">
                    Employee name
                  </th>
                  <th className="min-w-[20px] py-4 px-2 font-medium text-black">
                    Department
                  </th>
                  <th className="min-w-[20px] py-4 px-2 font-medium text-black">
                    Role
                  </th>
                  <th className="min-w-[20px] py-4 px-2 font-medium text-black">
                    authorized section
                  </th>
                  <th className="min-w-[20px] py-4 px-2 font-medium text-black">
                    Tasks
                  </th>
                  <th className="min-w-[20px] py-4 px-2 font-medium text-black">
                    Borrow days
                  </th>
                  <th className="min-w-[20px] py-4 px-2 font-medium text-black">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {staffList?.map(
                  (staffItem: Record<string, any>, index: number) => {
                    return (
                      <tr key={index}>
                        <td className="border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                          <h5 className="font-medium text-black">
                            {index + 1}
                          </h5>
                        </td>
                        <td className="min-w-[80px] border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                          <p className="text-black" id="card_title">
                            {staffItem.user}
                          </p>
                        </td>
                        <td className="min-w-[80px] border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                          <p className="text-black" id="card_title">
                            {staffItem.employee_id}
                          </p>
                        </td>
                        <td className="min-w-[80px] border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                          <p className="text-black" id="card_title">
                            {staffItem.department}
                          </p>
                        </td>
                        <td className="min-w-[80px] border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                          <p className="text-black" id="card_title">
                            {staffItem.role}
                          </p>
                        </td>
                        <td className="min-w-[80px] border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                          <p className="text-black" id="card_title">
                            {staffItem.authorized_sections}
                          </p>
                        </td> 
                        <td className="min-w-[80px] border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                          <p className="text-black" id="card_title">
                            {staffItem.tasks}
                          </p>
                        </td>
                        <td className="min-w-[80px] border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                          <p className="text-black" id="card_title">
                            {staffItem.borrowing_period_days}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                          <p className="text-black">
                            <button
                              className="hover:text-red"
                              onClick={() => showSwal(staffItem?.id)}
                            >
                              <TrashIcon className="h-[18px] w-[18px] hover:text-red-500" />
                            </button>
                            <button
                              className="ml-3"
                              onClick={() => editIconBox(staffItem?.id)}
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

export default StaffTableList;
