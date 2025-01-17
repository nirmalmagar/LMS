"use client";
import React, { useEffect } from "react";
import Modal from "@/components/Elements/Modal";
import TableHead from "@/components/Elements/TableHead/TableHead";
import { useState, FormEvent } from "react";
import InputField from "@/components/Form/InputForm";
import Btn from "@/components/Btn";
import { accessToken } from "@/helpers/TokenHelper";
import { toast } from "react-toastify";
import useSWR from "swr";
import { defaultFetcher } from "@/helpers/FetchHelper";
import { collectionToOptions } from "@/helpers/CollectionOption";
import SelectField from "@/components/Form/SelectField";

const AddShelves = () => {
  const [showPopUpModal, setShowPopUpModal] = useState<boolean>(false);
  const [selectValues, setSelectValues] = useState<Record<string,any>>({});
  const [inputFieldValue, setInputFieldValue] = useState<
    Record<string, string>
  >({});

  // library section lists
  const {data:libraryData} = useSWR(`${process.env.HOST}library-sections/`, defaultFetcher);
  const libraryOptions = collectionToOptions(libraryData?.results ? libraryData?.results : [])

  // change handler
  function handleSelectChange(name:string, choice:Record<string,any>){
    const key = name;
    const value = choice?.value;
    setSelectValues((prev)=>({...prev,[key]:value}));
  } 

  const handleFieldChange = (key: string, value: string): void => {
    if (key && value) {
      setInputFieldValue((prev) => ({ ...prev, [key]: value }));
    }
  };
  const handleCloseTap = () => {
    setShowPopUpModal(false);
    setInputFieldValue({});
  };
  // shelf add button
  const handleAddShelves = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const InputFileData = {
      name: inputFieldValue?.name,
      description: inputFieldValue?.description,
      section: inputFieldValue?.section,
    };
    try {
      const response = await fetch(`${process.env.HOST}shelves/`, {
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
        tableName="shelves List"
        addTitle="Add shelves"
        onClick={() => setShowPopUpModal(true)}
      />
      <Modal
        show={showPopUpModal}
        handleClose={handleCloseTap}
        modalTitle="Add shelves"
        size="lg"
      >
        <form id="lead-form" onSubmit={handleAddShelves}>
          <div className=" px-4 py-4 rounded-lg border border-gray-200">
            <InputField
              type="text"
              label="shelves name"
              name="number"
              placeholder="shelves Name"
              // defaultValue={inputFieldValue?.name}
              onChange={(e: any) => {
                handleFieldChange("number", e.target.value);
              }}
            />

            <SelectField
              label="section"
              name="section"
              options={libraryOptions}
              onChange={(e)=>{
                handleSelectChange("section",{
                  value:e.target.value
                });
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

export default AddShelves;
