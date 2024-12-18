"use client";
import React, { useEffect } from "react";
import Modal from "@/components/Elements/Modal";
import TableHead from "@/components/Elements/TableHead/TableHead";
import { useState, FormEvent } from "react";
import InputField from "@/components/Form/InputForm";
import Btn from "@/components/Btn";
import { accessToken } from "@/helpers/TokenHelper";
import { toast } from "react-toastify";

const AddLibrary = () => {
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
  const handleAddGrade = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const InputFileData = {
      name: inputFieldValue?.name,
      description: inputFieldValue?.description,
      location: inputFieldValue?.location
    };
    try {
      const response = await fetch(`${process.env.HOST}library-sections/`, {
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
        tableName="Library List"
        addTitle="Add Library"
        onClick={() => setShowPopUpModal(true)}
      />
      <Modal
        show={showPopUpModal}
        handleClose={handleCloseTap}
        modalTitle="Add Library"
        size="lg"
      >
        <form id="lead-form" onSubmit={handleAddGrade}>
          <div className=" px-4 py-4 rounded-lg border border-gray-200">
            <InputField
              type="text"
              label="Library name"
              name="name"
              placeholder="Edit Library Name"
              // defaultValue={inputFieldValue?.name}
              onChange={(e: any) => {
                handleFieldChange("name", e.target.value);
              }}
            />

            <InputField
              type="textarea"
              label="Description"
              name="description"
              placeholder="Edit Description"
              // defaultValue={inputFieldValue?.description}
              onChange={(e: any) => {
                handleFieldChange("description", e.target.value);
              }}
            />
            <InputField
              type="text"
              label="Location"
              name="location"
              placeholder="Edit Location"
              // defaultValue={inputFieldValue?.location}
              onChange={(e: any) => {
                handleFieldChange("location", e.target.value);
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

export default AddLibrary;