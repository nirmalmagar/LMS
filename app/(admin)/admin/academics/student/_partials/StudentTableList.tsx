"use client";
import React, { FormEvent, useState } from "react";
import useSWR from "swr";
import { toast } from "react-toastify";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { accessToken } from "@/helpers/TokenHelper";
import AddStudent from "./AddStudent";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import Modal from "@/components/Elements/Modal";
import InputField from "@/components/Form/InputForm";
import Btn from "@/components/Btn";
import { defaultFetcher } from "@/helpers/FetchHelper";
import Pagination from "@/components/Pagination/Pagination";

interface ShowHeading {
  showHeading?: boolean;
  showMore?: boolean;
  studentData: Record<string, any>[];
  mutate: () => void;
}

const StudentTableList: React.FC<ShowHeading> = ({
  showHeading,
  showMore,
  studentData,
  mutate,
}) => {
  let heading = showHeading;
  let showLists = showMore;

  const [studentId, setStudentId] = useState<number>();
  const [showPopUpModal, setShowPopUpModal] = useState<boolean>(false);

  const StudentURL = `${process.env.HOST}students/${studentId}`;
  const { data: studentIdList, mutate: editMutate } = useSWR(
    StudentURL,
    defaultFetcher
  );
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
            const response = await fetch(`${process.env.HOST}students/${id}/`, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${accessToken()}`,
                "Content-Type": "application/json",
                Accept: "application/json", // Fixed typo here
              },
            });
            if (response.ok) {
              toast.success("Student removed successfully.");
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
    setStudentId(id);
  };
  const handleCloseTap = () => {
    setShowPopUpModal(false);
  };
  // edit handle submit
  const handleEditStudent = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      const response = await fetch(
        `${process.env.HOST}students/${studentId}/`,
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
        toast.success("Student update successfully ");
        setShowPopUpModal(false);
        // mutate();
        editMutate();
      } else {
        toast.error("something went wrong");
      }
    } catch (e: any) {
      console.error(e);
    }
  };

  return (
    <>
      {/* edit Model popup  */}
      <Modal
        show={showPopUpModal}
        handleClose={handleCloseTap}
        modalTitle="Add Student"
        size="lg"
      >
        <form id="lead-form" onSubmit={handleEditStudent}>
          <div className=" px-4 py-4 rounded-lg border border-gray-200">
            <InputField
              type="text"
              label="user"
              name="user"
              placeholder="Enter User"
              defaultValue={studentIdList?.user}
            />
            <InputField
              type="text"
              label="Roll no."
              name="roll_number"
              placeholder="enter roll number"
              defaultValue={studentIdList?.roll_number}
            />
            <InputField
              type="date"
              label="Registration number"
              name="registration_number"
              placeholder="Enter registration_number"
              defaultValue={studentIdList?.registration_number}
            />
            <InputField
              type="number"
              label="Symbol No."
              name="symbol_number"
              placeholder="Enter Symbol no."
              defaultValue={studentIdList?.symbol_number}
            />
            <InputField
              type="text"
              label="Grade"
              name="grade"
              placeholder="enter grade"
              defaultValue={studentIdList?.grade}
            />
            <InputField
              type="text"
              label="Department"
              name="department"
              placeholder="Choose Department"
              defaultValue={studentIdList?.department}
            />
            <InputField
              type="text"
              label="Semester"
              name="semester"
              placeholder="enter semester"
              defaultValue={studentIdList?.semester}
            />
            <InputField
              type="number"
              label="Borrowing Days"
              name="borrowing_period_days"
              placeholder="enter borrowing period days"
              defaultValue={studentIdList?.borrowing_period_days}
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
              <Btn type="submit" className="bg-blue-600 text-white">
                Edit
              </Btn>
            </div>
          </div>
        </form>
      </Modal>
      <div className="mt-8 max-w-full rounded-3xl bg-white pb-2.5 px-2 pt-2 shadow-default sm:px-7.5 xl:pb-1">
        {heading && <AddStudent />}
        <div className="max-w-full overflow-x-auto">
          <table className="w-full text-sm table-auto">
            <thead>
              <tr className="border-b-2 text-left">
                <th className="py-4 px-2 font-medium text-black">S.N</th>
                <th className="min-w-[20px] py-4 px-2 font-medium text-black">
                  User
                </th>
                <th className="min-w-[20px] py-4 px-2 font-medium text-black">
                  Roll no.
                </th>
                <th className="min-w-[20px] py-4 px-2 font-medium text-black">
                  Registration no.
                </th>
                <th className="min-w-[20px] py-4 px-2 font-medium text-black">
                  Symbole no.
                </th>
                <th className="min-w-[20px] py-4 px-2 font-medium text-black">
                  grade
                </th>
                <th className="min-w-[20px] py-4 px-2 font-medium text-black">
                  Department
                </th>
                <th className="min-w-[20px] py-4 px-2 font-medium text-black">
                  Semester
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
              {studentData?.results?.map(
                (studentItem: Record<string, any>, index: number) => {
                  return (
                    <tr key={index}>
                      <td className="border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                        <h5 className="font-medium text-black">{index + 1}</h5>
                      </td>
                      <td className="min-w-[80px] border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                        <p className="text-black" id="card_title">
                          {studentItem.user}
                        </p>
                      </td>
                      <td className="min-w-[80px] border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                        <p className="text-black" id="card_title">
                          {studentItem.roll_number}
                        </p>
                      </td>
                      <td className="min-w-[80px] border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                        <p className="text-black" id="card_title">
                          {studentItem.registration_number}
                        </p>
                      </td>
                      <td className="min-w-[80px] border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                        <p className="text-black" id="card_title">
                          {studentItem.symbol_number}
                        </p>
                      </td>
                      <td className="min-w-[80px] border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                        <p className="text-black" id="card_title">
                          {studentItem.grade}
                        </p>
                      </td>
                      <td className="min-w-[80px] border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                        <p className="text-black" id="card_title">
                          {studentItem.department}
                        </p>
                      </td>
                      <td className="min-w-[80px] border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                        <p className="text-black" id="card_title">
                          {studentItem.semester}
                        </p>
                      </td>
                      <td className="min-w-[80px] border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                        <p className="text-black" id="card_title">
                          {studentItem.borrowing_period_days}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                        <p className="text-black">
                          <button
                            className="hover:text-red"
                            onClick={() => showSwal(studentItem?.id)}
                          >
                            <TrashIcon className="h-[18px] w-[18px] hover:text-red-500" />
                          </button>
                          <button
                            className="ml-3"
                            onClick={() => editIconBox(studentItem?.id)}
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
          <Pagination
            total_Pages={studentData?.total_pages}
            current_Page={studentData?.current_page}
            results={studentData?.results}
            mutate={mutate}
          />
        </div>
      </div>
    </>
  );
};

export default StudentTableList;
