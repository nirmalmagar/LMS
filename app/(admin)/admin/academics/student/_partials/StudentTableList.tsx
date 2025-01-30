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
import SelectField from "@/components/Form/SelectField";
import { collectionToOptions } from "@/helpers/CollectionOption";
import { UserId } from "@/components/IdToName/IdToName";

interface ShowHeading {
  showHeading?: boolean;
  showMore?: boolean;
  studentData: Record<string, any>[];
  mutate: () => void;
}
const semesterOptions = [
  {
    value: "first",
    label: "first",
  },
  {
    value: "second ",
    label: "second",
  },
  {
    value: "third",
    label: "third",
  },
  {
    value: "fourth",
    label: "fourth",
  },
  {
    value: "fifth",
    label: "fifth",
  },
  {
    value: "sixth",
    label: "sixth",
  },
  {
    value: "seventh",
    label: "seventh",
  },
  {
    value: "eighth",
    label: "eighth",
  },
];
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
  const [selectValue, setSelectValue] = useState<Record<string, any>>({});
  const [inputFieldValue, setInputFieldValue] = useState<Record<string, any>>(
    {}
  );
  const [error, setError] = useState<Record<string, any>>({});

  const { data: userData } = useSWR(`${process.env.HOST}user/`, defaultFetcher);
  const userList = collectionToOptions(
    userData?.results ? userData?.results : []
  );

  const { data: departmentData } = useSWR(
    `${process.env.HOST}departments/`,
    defaultFetcher
  );
  const departmentOption = collectionToOptions(
    departmentData?.results ? departmentData?.results : []
  );

  const StudentURL = `${process.env.HOST}students/${studentId}`;
  const { data: studentIdList, mutate: editMutate } = useSWR(
    StudentURL,
    defaultFetcher
  );

  function handleSelectChange(name: string, choice: Record<string, any>) {
    const key = name;
    const value = choice?.value;
    setSelectValue((prev) => ({ ...prev, [key]: value }));
  }

  const handleFieldChange = (key: string, value: string): void => {
    if (key && value) {
      setInputFieldValue((prev) => ({ ...prev, [key]: value }));
    }
  };

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
    setSelectValue({});
    setInputFieldValue({})
    setError({})
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
      const data = await response.json();
      if (response.ok) {
        toast.success("Student update successfully ");
        setShowPopUpModal(false);
        mutate();
        editMutate();
        handleCloseTap();
      } else {
        setError(data);
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
            <SelectField
              label="user"
              options={userList}
              defaultValue={studentIdList?.user?.id}
              value={selectValue?.user}
              fieldErrors={error?.user ?? []}
              onChange={(e) => {
                handleSelectChange("user", {
                  value: e.target.value,
                });
              }}
            />

            <InputField
              type="number"
              label="Roll no."
              name="roll_number"
              placeholder="enter roll number"
              defaultValue={studentIdList?.roll_number}
              fieldErrors={error?.roll_number ?? []}
              onChange={(e: any) => {
                handleFieldChange("roll_number", e.target.value);
              }}
            />
            <InputField
              type="text"
              label="Registration no."
              name="registration_number"
              placeholder="Enter registration_number"
              defaultValue={studentIdList?.registration_number}
              value={inputFieldValue?.registration_number}
              fieldErrors={error?.registration_number ?? []}
              onChange={(e: any) => {
                handleFieldChange("registration_number", e.target.value);
              }}
            />
            <InputField
              type="number"
              label="Symbol No."
              name="symbol_number"
              placeholder="Enter Symbol no."
              defaultValue={studentIdList?.symbol_number}
              value={inputFieldValue?.symbol_number}
              fieldErrors={error?.symbol_number ?? []}
              onChange={(e: any) => {
                handleFieldChange("symbol_number", e.target.value);
              }}
            />
            <InputField
              type="text"
              label="Grade"
              name="grade"
              placeholder="enter grade"
              defaultValue={studentIdList?.grade}
              value={inputFieldValue?.grade}
              fieldErrors={error?.grade ?? []}
              onChange={(e: any) => {
                handleFieldChange("grade", e.target.value);
              }}
            />
            <SelectField
              label="Department"
              options={departmentOption}
              name="department"
              value={selectValue?.department}
              defaultValue={studentIdList?.department?.id}
              fieldErrors={error?.department ?? []}
              onChange={(e: any) => {
                handleSelectChange("department", e.target.value);
              }}
            />
            {/* <SelectField
              label="Semester"
              options={semesterOptions}
              value={selectValue?.semester}
              defaultValue={studentIdList?.semester}
              fieldErrors={error?.semester ?? []}
              onChange={(e) => {
                handleSelectChange("semester", {
                  value: e.target.value,
                });
              }}
            /> */}

            <InputField
              type="text"
              label="Semester"
              name="semester"
              placeholder="enter semester"
              defaultValue={studentIdList?.semester}
              fieldErrors={error?.semester ?? []}
              onChange={(e: any) => {
                handleFieldChange("semester", e.target.value);
              }}
            />
            <InputField
              type="number"
              label="Borrowing Days"
              name="borrowing_period_days"
              placeholder="enter borrowing period days"
              defaultValue={studentIdList?.borrowing_period_days}
              fieldErrors={error?.borrowing_period_days ?? []}
              onChange={(e: any) => {
                handleFieldChange("borrowing_period_days", e.target.value);
              }}
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
        {heading && <AddStudent mutate={mutate} />}
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
                        <UserId Id={studentItem.user} />
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
          {/* <Pagination
            total_Pages={studentData?.total_pages}
            current_Page={studentData?.current_page}
            results={studentData?.results}
            mutate={mutate}
          /> */}
        </div>
      </div>
    </>
  );
};

export default StudentTableList;
