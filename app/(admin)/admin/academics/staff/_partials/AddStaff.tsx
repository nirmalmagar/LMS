"use client";
import React from "react";
import Modal from "@/components/Elements/Modal";
import TableHead from "@/components/Elements/TableHead/TableHead";
import { useState, FormEvent } from "react";
import InputField from "@/components/Form/InputForm";
import Btn from "@/components/Btn";
import { accessToken } from "@/helpers/TokenHelper";
import { toast } from "react-toastify";

const AddStaff = () => {
  const [showPopUpModal, setShowPopUpModal] = useState<boolean>(false);
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
  // book add button
  const handleAddStaff = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const InputFileData = {
      user: inputFieldValue?.user,
      employee_id: inputFieldValue?.employee_id,
      grade: inputFieldValue?.grade,
      department: inputFieldValue?.department,
      designation: inputFieldValue?.designation,
      borrowing_period_days: inputFieldValue?.borrowing_period_days,
    };
    try {
      const response = await fetch(`${process.env.HOST}departments/`, {
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
        tableName="Staff List"
        addTitle="Add Staff"
        onClick={() => setShowPopUpModal(true)}
      />
      <Modal
        show={showPopUpModal}
        handleClose={handleCloseTap}
        modalTitle="Add Staff"
        size="lg"
      >
        <form id="lead-form" onSubmit={handleAddStaff}>
          <div className=" px-4 py-4 rounded-lg border border-gray-200">
            <InputField
              type="text"
              label="user"
              name="user"
              placeholder="Enter User"
              // defaultValue={inputFieldValue?.user}
              onChange={(e: any) => {
                handleFieldChange("user", e.target.value);
              }}
            />
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
            <InputField
              type="text"
              label="Grade"
              name="grade"
              placeholder="Enter grade"
              // defaultValue={inputFieldValue?.grade}
              onChange={(e: any) => {
                handleFieldChange("grade", e.target.value);
              }}
            />
            <InputField
              type="number"
              label="Department"
              name="department"
              placeholder="Choose Department"
              // defaultValue={inputFieldValue?.department}
              onChange={(e: any) => {
                handleFieldChange("department", e.target.value);
              }}
            />
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

export default AddStaff;
