"use client";
import React from "react";
import Modal from "@/components/Elements/Modal";
import TableHead from "@/components/Elements/TableHead/TableHead";
import { useState, FormEvent } from "react";
import InputField from "@/components/Form/InputForm";
import Btn from "@/components/Btn";
import { accessToken } from "@/helpers/TokenHelper";
import { toast } from "react-toastify";

const AddDepartment = () => {
  const [showPopUpModal, setShowPopUpModal] = useState<boolean>(false);
  const [inputFieldValue, setInputFieldValue] = useState<
    Record<string, string>
  >({});
  const [error, setError] = useState("");

  const handleFieldChange = (key: string, value: string): void => {
    // if (key && value) {
      setInputFieldValue((prev) => ({ ...prev, [key]: value }));
    // }
  };
  const handleCloseTap = () => {
    setShowPopUpModal(false);
    setInputFieldValue({});
  };
  // book add button
  const handleAddGrade = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const InputFileData = {
      name: inputFieldValue?.name,
      head_of_department: inputFieldValue?.head_of_department,
      description: inputFieldValue?.description,
      phone_number: inputFieldValue?.phone_number,
      location: inputFieldValue?.location,
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
        setShowPopUpModal(false);
      } else {
        toast.error(data?.phone_number[0]);
        setError(data?.phone_number[0]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setInputFieldValue({});
    }
  };
  return (
    <>
      <TableHead
        className="px-2 py-4"
        size="small"
        tableName="Departments List"
        addTitle="Add Departments"
        onClick={() => setShowPopUpModal(true)}
      />
      <Modal
        show={showPopUpModal}
        handleClose={handleCloseTap}
        modalTitle="Add Department"
        size="lg"
      >
        <form id="lead-form" onSubmit={handleAddGrade}>
          <div className=" px-4 py-4 rounded-lg border border-gray-200">
            <InputField
              type="text"
              label="Department name"
              name="name"
              placeholder="enter department name"
              // defaultValue={inputFieldValue?.name}
              onChange={(e: any) => {
                handleFieldChange("name", e.target.value);
              }}
            />

            <InputField
              labelStyle="label-left"
              type="text"
              label="Department Head"
              name="head_of_department"
              placeholder="enter department head name"
              // defaultValue={inputFieldValue?.head_of_department}
              onChange={(e: any) => {
                handleFieldChange("head_of_department", e.target.value);
              }}
            />
            
            <InputField
              type="textarea"
              label="Description"
              name="description"
              placeholder="enter description"
              // defaultValue={inputFieldValue?.description}
              onChange={(e: any) => {
                handleFieldChange("description", e.target.value);
              }}
            />
            
            <InputField
              type="number"
              label="Phone no."
              name="phone_number"
              placeholder="enter phone number"
              // fieldErrors={error?.phone_number ?? [] }
              // fieldErrors={error?.phone_number[0] ?? ["hello error"] }
              // defaultValue={inputFieldValue?.phone_number}
              onChange={(e: any) => {
                handleFieldChange("phone_number", e.target.value);
              }}
            />
            <InputField
              type="text"
              label="Location"
              name="location"
              placeholder="enter location"
              // defaultValue={inputFieldValue?.location}
              onChange={(e: any) => {
                handleFieldChange("location", e.target.value);
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

export default AddDepartment;
