"use client";
import React, { useContext } from "react";
import Modal from "@/components/Elements/Modal";
import TableHead from "@/components/Elements/TableHead/TableHead";
import { useState, FormEvent } from "react";
import InputField from "@/components/Form/InputForm";
import Btn from "@/components/Btn";
import { accessToken } from "@/helpers/TokenHelper";
import { toast } from "react-toastify";
import { AuthContext } from "@/context/AuthContext";
import Multiselect from "multiselect-react-dropdown";

interface listProps {
  id:number;
  name:string;
  type: 'department' | 'grades' | 'users'
}

const AddTeacher = () => {
  const { department , grades , users } = useContext(AuthContext);
  const [showPopUpModal, setShowPopUpModal] = useState<boolean>(false);
  const [selectDepartmentId, setSelectDepartmentId] = useState<number[]>([]);
  const [selectGradeId, setSelectGradeId] = useState<number[]>([]);
  const [selectUserId, setSelectUserId] = useState<number[]>([]);
  const [inputFieldValue, setInputFieldValue] = useState<
    Record<string, string>
  >({});

  const handleFieldChange = (key: string, value: string): void => {
    if (key && value) {
      setInputFieldValue((prev) => ({ ...prev, [key]: value }));
    }
  };
  const handleCloseTap = () => {
    setShowPopUpModal(false);
    setInputFieldValue({});
  };

  // select user lists
  const handleSelectUser =(user:listProps[])=>{
    const ids = user.map((id_list)=>id_list?.id);
    setSelectUserId(ids);
  }

  // handle remove user list
  const handleRemoveUser = (user:listProps[])=>{
    const ids = user.map((id_list)=>id_list?.id)
    setSelectUserId(ids);
  }

  // select department lists
  const handleSelectDepartment=(department:listProps[])=>{
    const ids = department.map((id_list)=>id_list?.id);
    setSelectDepartmentId(ids);
  }

  // handle remove department list
  const handleRemoveDepartment = (department:listProps[])=>{
    const ids = department.map((id_list)=>id_list?.id)
    setSelectDepartmentId(ids);
  }

  // select grade lists
  const handleSelectGrades =(grade:listProps[])=>{
    const ids = grade.map((id_list)=>id_list?.id);
    setSelectGradeId(ids);
  }

  // handle remove grade list
  const handleRemoveGrades = (grade:listProps[])=>{
    const ids = grade.map((id_list)=>id_list?.id)
    setSelectGradeId(ids);
  }

  // book add button
  const handleAddGrade = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const InputFileData = {
      user : selectUserId,
      employee_id : inputFieldValue?.employee_id,
      grade : selectGradeId,
      department : selectDepartmentId,
      designation : inputFieldValue?.designation,
      borrowing_period_days : inputFieldValue?.borrowing_period_days,
    }
      try {
      const response = await fetch(`${process.env.HOST}teachers/`, {
        method: "POST",
        body: JSON.stringify(InputFileData),
        headers: {
          Authorization: `Bearer ${accessToken()}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("data successfully insert");
      } else {
        toast.error("some error on field");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setInputFieldValue({});
      setShowPopUpModal(false);
    }
  };
  return (
    <>
      <TableHead
        className="px-2 py-4"
        size="small"
        tableName="Teachers List"
        addTitle="Add Teacher"
        onClick={() => setShowPopUpModal(true)}
      />
      <Modal
        show={showPopUpModal}
        handleClose={handleCloseTap}
        modalTitle="Add Teacher"
        size="lg"
      >
        <form id="lead-form" onSubmit={handleAddGrade}>
          <div className=" px-4 py-4 rounded-lg border border-gray-200">
          <div className="flex gap-28">
              <label htmlFor="">User</label>
              <Multiselect
                className="text-sm leading-4 flex-1"
                displayValue="name"
                options={users}
                onSelect={handleSelectUser}
                onRemove={handleRemoveUser}
              />
            </div>

            <InputField
              type="text"
              label="Enter Employee"
              name="employee_id"
              placeholder="enter department head name"
              // defaultValue={inputFieldValue?.employee_id}
              onChange={(e: any) => {
                handleFieldChange("employee_id", e.target.value);
              }}
            />
            <div className="flex gap-24">
              <label htmlFor="">Grade</label>
              <Multiselect
                className="text-sm leading-4 w-full flex-1"
                displayValue="name"
                options={grades}
                onSelect={handleSelectGrades}
                onRemove={handleRemoveGrades}
              />
            </div>

            <div className="flex gap-14 mt-2">
              <label htmlFor="" className="text-base">Department</label>
              <Multiselect
                className="text-sm leading-4 w-full flex-1"
                displayValue="name"
                options={department}
                onSelect={handleSelectDepartment}
                onRemove={handleRemoveDepartment}
              />
            </div>

            <InputField
              type="text"
              label="Designation"
              name="designation"
              placeholder="enter "
              // defaultValue={inputFieldValue?.designation}
              onChange={(e: any) => {
                handleFieldChange("designation", e.target.value);
              }}
            />
            <InputField
              type="number"
              label="Borrowing Days"
              name="borrowing_period_days"
              placeholder="enter "
              // defaultValue={inputFieldValue?.borrowing_period_days}
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
                setInputFieldValue({});
              }}  
            >
              Cancel
            </Btn>

            <div className="flex gap-x-4">
              <Btn type="submit" className="bg-blue-600 text-white">
                Submit
              </Btn>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AddTeacher;
