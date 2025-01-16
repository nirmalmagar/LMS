"use client";
import React, { FormEvent, useState } from "react";
import useSWR, { mutate } from "swr";
import { toast } from "react-toastify";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { accessToken } from "@/helpers/TokenHelper";
import AddTeacher from "./AddTeacher";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import Modal from "@/components/Elements/Modal";
import InputField from "@/components/Form/InputForm";
import Btn from "@/components/Btn";
import { defaultFetcher } from "@/helpers/FetchHelper";
import SelectField from "@/components/Form/SelectField";
import { collectionToOptions } from "@/helpers/CollectionOption";

interface ShowHeading {
  showHeading?: boolean;
  showMore?: boolean;
  data:Record<string,any>[];
  mutate:()=>void;
}

const TeacherTableList: React.FC<ShowHeading> = ({
  showHeading,
  showMore,
  data,
  mutate
}) => {
  let heading = showHeading;
  let showLists = showMore;

  // const [showMore, setShowMore] = useState<boolean>(false);
  const [teacherId, setTeacherId] = useState<number>();
  const [showPopUpModal, setShowPopUpModal] = useState<boolean>(false);
  const [selectValue, setSelectValue] = useState<Record<string,any>>({});
  const [error, setError] = useState<Record<string,any>>({});


  const TeachersURL = `${process.env.HOST}teachers/${teacherId}`;
  const { data: teacherIdList , mutate: editMutate } = useSWR(TeachersURL, defaultFetcher);

  // users list
  const UserURL = `${process.env.HOST}user/`;
  const { data: userList } = useSWR(UserURL, defaultFetcher);
  const userOption = collectionToOptions(userList?.results ? userList?.results : []);

  // grade list
  const gradeURL = `${process.env.HOST}grades/`
  const {data: gradeList} = useSWR(gradeURL, defaultFetcher);
  const gradeOption = collectionToOptions(gradeList?.results ? gradeList?.results : []);

  // department
  const departmentURL = `${process.env.HOST}departments/`
  const {data: departmentList} = useSWR(departmentURL, defaultFetcher);
  const departmentOption = collectionToOptions(departmentList?.results ? departmentList?.results : []);

  // handle select change
  const handleSelectChange = (name:string , choice:Record<string,any>)=>{
    const key = name;
    const value = choice?.value;
    setSelectValue((prev)=>({...prev,[key]:value}))
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
    setTeacherId(id);
  };
  const handleCloseTap = () => {
    setShowPopUpModal(false);
  };
  // edit handle submit
  const handleEditTeacher = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set("user",selectValue?.user);
    formData.set("grade",selectValue?.grade);
    formData.set("department",selectValue?.department);
    try {
      const response = await fetch(`${process.env.HOST}teachers/${teacherId}/`, {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${accessToken()}`,
          Accept: "application/json",
        },
      });
      const data = await response.json();
      
      if (data?.results || data?.result){
        // setError(data?.error)
      }
      else if (response.ok) {
        toast.success("Teacher update successfully ");
        setShowPopUpModal(false);
        mutate();
        editMutate();
      } else {
        toast.error("something went wrong");
        setError(data?.error)
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
        modalTitle="Add Teacher"
        size="lg"
      >
        <form id="lead-form" onSubmit={handleEditTeacher}>
          <div className=" px-4 py-4 rounded-lg border border-gray-200">
            <SelectField 
              className="w-full ml-40"
              options={userOption}
              value={selectValue?.user}
              defaultValue={teacherIdList?.user?.id}
              label="Users"
              fieldErrors={error?.users}
              onChange={(e) => {
                handleSelectChange("user", {
                  value: e.target.value,
                });
              }}
            />
            <InputField
              type="text"
              label="Employee name"
              fieldErrors={error?.employee_id}
              name="employee_id"
              placeholder="Choose Employee name"
              defaultValue={teacherIdList?.employee_id}
            />
            <div className="mb-2">
            <SelectField
              className="mb-8"
              label="Grade"
              options={gradeOption}
              value={selectValue?.grade}
              defaultValue={teacherIdList?.grade?.id}
              onChange={(e)=>{
                handleSelectChange("grade",{
                  value: e.target.value
                })
              }}
            />
            </div>
            <SelectField
              label="Department"
              options={departmentOption}
              value={selectValue?.department}
              defaultValue={teacherIdList?.department?.id}
              onChange={(e)=>{
                handleSelectChange("department",{
                  value: e.target.value
                })
              }}
            />
            <InputField
              type="textarea"
              label="Designation"
              fieldErrors={error?.designation}
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
              >
                Edit
              </Btn>
            </div>
          </div>
        </form>
      </Modal>
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
                {data?.results?.map(
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
          </div>
        </div>
    </>
  );
};

export default TeacherTableList;
