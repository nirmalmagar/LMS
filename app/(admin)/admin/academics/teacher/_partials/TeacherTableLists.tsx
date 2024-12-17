"use client";
import React, { FormEvent, useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import { toast } from "react-toastify";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { accessToken } from "@/helpers/TokenHelper";
import AddTeacher from "./AddTeacher";
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

const TeacherTableList: React.FC<ShowHeading> = ({
  showHeading,
  showMore,
}) => {
  let heading = showHeading;
  let showLists = showMore;

  // const [showMore, setShowMore] = useState<boolean>(false);
  const [teachersLists, setTeachersLists] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState<number>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [teacherId, setTeacherId] = useState<number>();
  const [showPopUpModal, setShowPopUpModal] = useState<boolean>(false);

  const TeachersURL = `${process.env.HOST}teachers/${teacherId}`;
  const { data: teacherIdList } = useSWR(TeachersURL, defaultFetcher);
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
            const response = await fetch(`${process.env.HOST}teachers/${id}/`, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${accessToken()}`,
                "Content-Type": "application/json",
                Accept: "application/json", // Fixed typo here
              },
            });
            if (response.ok) {
              toast.success("Teacher removed successfully.");
              mutate(teachersLists);
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
    setTeacherId(id);
  };
  const handleCloseTap = () => {
    setShowPopUpModal(false);
  };
  // edit handle submit
  const handleEditTeacher = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      const response = await fetch(`${process.env.HOST}teachers/${teacherId}/`, {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${accessToken()}`,
          Accept: "application/json",
        },
      });
      // const data = await response.json();
      if (response.ok) {
        toast.success("Teacher update successfully ");
      } else {
        toast.error("some thing went wrong");
      }
    } catch (e: any) {
      console.error(e);
    }
  };

  // fetch teachers lists
  const TeacherList = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.HOST}teachers/?page=${currentPage}`,
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
      setTeachersLists(data?.results);
        setIsLoading(false);
    } catch (e) {
      console.log("error", e);
      setIsLoading(false);
    }
  };

  // pagination number lists in array
  let totalPageArray = teachersLists
    ? Array.from({ length: totalPages }, (_, index) => index + 1)
    : [];

  // pagination
  let paginationLinks =
    teachersLists &&
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
    TeacherList();
  }, [currentPage]);

  return (
    <>
      {/* edit Model popup  */}
      <Modal
        show={showPopUpModal}
        handleClose={handleCloseTap}
        modalTitle="Add Teacher"
        size="lg"
      >
        <form id="lead-form" onSubmit={handleEditTeacher}>
          <div className=" px-4 py-4 rounded-lg border border-gray-200">
            <InputField
              type="text"
              label="User"
              name="user"
              placeholder="Choose User"
              defaultValue={teacherIdList?.user}
            />
            <InputField
              type="text"
              label="Employee name"
              name="employee_id"
              placeholder="Choose Employee name"
              defaultValue={teacherIdList?.employee_id}
            />
            <InputField
              type="text"
              label="Grade"
              name="grade"
              placeholder="Choose grade"
              defaultValue={teacherIdList?.grade}
            />
            <InputField
              type="text"
              label="Department"
              name="department"
              placeholder="Choose Department"
              defaultValue={teacherIdList?.department}
            />
            <InputField
              type="textarea"
              label="Designation"
              name="designation"
              placeholder="Enter Designation"
              defaultValue={teacherIdList?.designation}
            />
            <InputField
              type="number"
              label="borrowing days"
              name="borrowing_period_days"
              placeholder="enter grade"
              defaultValue={teacherIdList?.borrowing_period_days}
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
              <Btn type="submit" className="bg-blue-600 text-white"
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
          {heading && <AddTeacher />}
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
                    Grade
                  </th>
                  <th className="min-w-[20px] py-4 px-2 font-medium text-black">
                    Department
                  </th>
                  <th className="min-w-[20px] py-4 px-2 font-medium text-black">
                    Designation
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
                {teachersLists?.map(
                  (teachersItems: Record<string, any>, index: number) => {
                    return (
                      <tr key={index}>
                        <td className="border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                          <h5 className="font-medium text-black">
                            {index + 1}
                          </h5>
                        </td>
                        <td className="min-w-[80px] border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                          <p className="text-black" id="card_title">
                            {teachersItems.user}
                          </p>
                        </td>
                        <td className="min-w-[80px] border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                          <p className="text-black" id="card_title">
                            {teachersItems.employee_id}
                          </p>
                        </td>
                        <td className="min-w-[80px] border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                          <p className="text-black" id="card_title">
                            {teachersItems.grade}
                          </p>
                        </td>
                        <td className="min-w-[80px] border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                          <p className="text-black" id="card_title">
                            {teachersItems.department}
                          </p>
                        </td>
                        <td className="min-w-[80px] border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                          <p className="text-black" id="card_title">
                            {teachersItems.designation}
                          </p>
                        </td>
                        <td className="min-w-[80px] border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                          <p className="text-black" id="card_title">
                            {teachersItems.borrowing_period_days}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                          <p className="text-black">
                            <button
                              className="hover:text-red"
                              onClick={() => showSwal(teachersItems?.id)}
                            >
                              <TrashIcon className="h-[18px] w-[18px] hover:text-red-500" />
                            </button>
                            <button
                              className="ml-3"
                              onClick={() => editIconBox(teachersItems?.id)}
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

export default TeacherTableList;
