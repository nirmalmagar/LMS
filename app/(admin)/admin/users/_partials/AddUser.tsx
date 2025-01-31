"use client";
import React from "react";
import Modal from "@/components/Elements/Modal";
import TableHead from "@/components/Elements/TableHead/TableHead";
import { useState, FormEvent } from "react";
import InputField from "@/components/Form/InputForm";
import Btn from "@/components/Btn";
import { accessToken } from "@/helpers/TokenHelper";
import { toast } from "react-toastify";

interface userProps{
  mutate:()=>void;
}
const AddUser:React.FC<userProps> = ({mutate}) => {
  const [showPopUpModal, setShowPopUpModal] = useState<boolean>(false);
  const [inputFieldValue, setInputFieldValue] = useState<
    Record<string, string>
  >({});
  const [error, setError] = useState<Record<string, any>>({});

  const handleFieldChange = (key: string, value: string): void => {
    if (key && value) {
      setInputFieldValue((prev) => ({ ...prev, [key]: value }));
    }
  };
  const handleCloseTap = () => {
    setShowPopUpModal(false);
    setInputFieldValue({});
    setError({});
  };
  // book add button
  const handleAddUsers = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const InputFileData = {
      first_name: inputFieldValue?.first_name,
      middle_name: inputFieldValue?.middle_name,
      last_name: inputFieldValue?.last_name,
      email: inputFieldValue?.email,
      password: inputFieldValue?.password
    };
    try {
      const response = await fetch(`${process.env.HOST}user/`, {
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
        toast.success("user successfully added");
        mutate();
        handleCloseTap();
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
        tableName="Users List"
        addTitle="Add Users"
        onClick={() => setShowPopUpModal(true)}
      />
      <Modal
        show={showPopUpModal}
        handleClose={handleCloseTap}
        modalTitle="Add Users"
        size="lg"
      >
        <form id="lead-form" onSubmit={handleAddUsers}>
          <div className=" px-4 py-4 rounded-lg border border-gray-200">
            <InputField
              type="text"
              label="First Name"
              name="first_name"
              placeholder="enter first name"
              fieldErrors={error?.first_name ?? []}
              defaultValue={inputFieldValue?.first_name}
              onChange={(e: any) => handleFieldChange("first_name", e.target.value)}
            />
            <InputField
              type="text"
              label="Middle Name"
              name="middle_name"
              placeholder="enter middle name"
              fieldErrors={error?.middle_name ?? []}
              defaultValue={inputFieldValue?.middle_name}
              onChange={(e: any) => handleFieldChange("middle_name", e.target.value)}
            />
            <InputField
              type="text"
              label="Last Name"
              name="last_name"
              placeholder="enter last name"
              fieldErrors={error?.last_name ?? []}
              defaultValue={inputFieldValue?.last_name}
              onChange={(e: any) => handleFieldChange("last_name", e.target.value)}
            />
            <InputField
              type="email"
              label="Email"
              name="email"
              placeholder="enter email"
              fieldErrors={error?.email ?? []}
              defaultValue={inputFieldValue?.email}
              onChange={(e: any) => handleFieldChange("email", e.target.value)}
            />
            <InputField
              type="password"
              label="Password"
              name="password"
              placeholder="enter grade"
              fieldErrors={error?.password ?? []}
              defaultValue={inputFieldValue?.password}
              onChange={(e: any) => handleFieldChange("password", e.target.value)}
            />
          </div>

          <div className="bg-white sticky left-4 bottom-0 right-4 pt-6 border-gray-200 flex items-end  justify-between">
            <Btn
              outline="error"
              onClick={handleCloseTap}
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

export default AddUser;
