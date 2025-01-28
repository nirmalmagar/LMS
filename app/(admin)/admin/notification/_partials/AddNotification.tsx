"use client";
import React from "react";
import Modal from "@/components/Elements/Modal";
import TableHead from "@/components/Elements/TableHead/TableHead";
import { useState, FormEvent } from "react";
import InputField from "@/components/Form/InputForm";
import Btn from "@/components/Btn";
import { accessToken } from "@/helpers/TokenHelper";
import { toast } from "react-toastify";
interface ShowHeading {
  mutate: () => void;
}
const AddNotification:React.FC<ShowHeading> = ({mutate}) => {
  const [showPopUpModal, setShowPopUpModal] = useState<boolean>(false);
  const [inputFieldValue, setInputFieldValue] = useState<
    Record<string, string>
  >({});
  const [error, setError] = useState<Record<string, any>>({});

  const handleFieldChange = (key: string, value: string): void => {
    // if (key && value) {
    setInputFieldValue((prev) => ({ ...prev, [key]: value }));
    // }
  };
  const handleCloseTap = () => {
    setShowPopUpModal(false);
    setInputFieldValue({});
    setError({});
  };
  // book add button
  const handleAddGrade = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const InputFileData = {
      user: inputFieldValue?.user,
      message: inputFieldValue?.message,
      timestamp: inputFieldValue?.timestamp
    };
    try {
      const response = await fetch(`${process.env.HOST}notifications/`, {
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
        setInputFieldValue({});
        setError({});
        mutate();
      } else {
        setError(data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <TableHead
        className="px-2 py-4"
        size="small"
        tableName="Notification List"
        addTitle="Add Notification"
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
              fieldErrors={error?.name ?? []}
              onChange={(e: any) => {
                handleFieldChange("name", e.target.value);
              }}
            />

            <InputField
              type="textarea"
              label="Description"
              name="timestamp"
              placeholder="enter timestamp"
              fieldErrors={error?.timestamp ?? []}
              // defaultValue={inputFieldValue?.timestamp}
              onChange={(e: any) => {
                handleFieldChange("timestamp", e.target.value);
              }}
            />
            <InputField
              type="text"
              label="Location"
              name="location"
              placeholder="enter location"
              fieldErrors={error?.location ?? []}
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
                setError({})
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

export default AddNotification;
