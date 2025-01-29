"use client";
import React from "react";
import Modal from "@/components/Elements/Modal";
import TableHead from "@/components/Elements/TableHead/TableHead";
import { useState, FormEvent } from "react";
import InputField from "@/components/Form/InputForm";
import Btn from "@/components/Btn";
import { accessToken } from "@/helpers/TokenHelper";
import { toast } from "react-toastify";
import SelectField from "@/components/Form/SelectField";
import useSWR from "swr";
import { defaultFetcher } from "@/helpers/FetchHelper";
import { collectionToOptions } from "@/helpers/CollectionOption";
interface ShowHeading {
  mutate: () => void;
}
const AddNotification:React.FC<ShowHeading> = ({mutate}) => {
  const [showPopUpModal, setShowPopUpModal] = useState<boolean>(false);
  const [selectValues, setSelectValues] = useState<Record<string, any>>({});
  const [inputFieldValue, setInputFieldValue] = useState<
    Record<string, string>
  >({});
  const [error, setError] = useState<Record<string, any>>({});
  const { data:userList } = useSWR(`${process.env.HOST}user/`, defaultFetcher);
  const userOption = collectionToOptions(userList?.results ? userList?.results : []);

  function handleSelectChange(name: string, choice: Record<string, any>) {
    const key = name;
    const value = choice?.value;
    setSelectValues((values) => ({ ...values, [key]: value }));
  }

  const handleFieldChange = (key: string, value: string): void => {
    // if (key && value) {
    setInputFieldValue((prev) => ({ ...prev, [key]: value }));
    // }
  };
  const handleCloseTap = () => {
    setShowPopUpModal(false);
    setSelectValues({});
    setInputFieldValue({});
    setError({});
  };
  // book add button
  const handleAddGrade = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const InputFileData = {
      user: selectValues?.user,
      timestamp: inputFieldValue?.timestamp,
      message: inputFieldValue?.message,
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
        handleCloseTap();
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
        modalTitle="Add Notification"
        size="lg"
      >
        <form id="lead-form" onSubmit={handleAddGrade}>
          <div className=" px-4 py-4 rounded-lg border border-gray-200">
          <SelectField
            options={userOption}
            label={"users"}
            value={selectValues?.user}
            fieldErrors={error?.user ?? []}
            onChange={(e)=>{
              handleSelectChange("user",{
                value: e.target.value
              })
            }}
          />

            <InputField
              type="date"
              label="Timestamp"
              name="timestamp"
              placeholder="enter timestamp"
              fieldErrors={error?.timestamp ?? []}
              // defaultValue={inputFieldValue?.timestamp}
              onChange={(e: any) => {
                handleFieldChange("timestamp", e.target.value);
              }}
            />
            <InputField
              type="textarea"
              label="Message"
              name="message"
              placeholder="enter message"
              fieldErrors={error?.message ?? []}
              // defaultValue={inputFieldValue?.message}
              onChange={(e: any) => {
                handleFieldChange("message", e.target.value);
              }}
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

export default AddNotification;
