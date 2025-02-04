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

interface FineProps{
  mutate:()=>void;
}
const AddFine:React.FC<FineProps> = ({mutate}) => {
  const [showPopUpModal, setShowPopUpModal] = useState<boolean>(false);
  const [selectValues, setSelectValues] = useState<Record<string,any>>({});
  const [inputFieldValue, setInputFieldValue] = useState<
    Record<string, string>
  >({});
  const [error,setError] = useState<Record<string,any>>({});

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
    setError({});
  };
  // shelf add button
  const handleAddFine = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const InputFileData = {
      number: inputFieldValue?.number,
      description: inputFieldValue?.description,
      section: selectValues?.section,
    };
    try {
      const response = await fetch(`${process.env.HOST}fine/`, {
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
        toast.success("Find Add Successfully");
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
        tableName="fine List"
        addTitle="Add fine"
        onClick={() => setShowPopUpModal(true)}
      />
      <Modal
        show={showPopUpModal}
        handleClose={handleCloseTap}
        modalTitle="Add fine"
        size="lg"
      >
        <form id="lead-form" onSubmit={handleAddFine}>
          <div className=" px-4 py-4 rounded-lg border border-gray-200">
            <InputField
              type="text"
              label="Borrow Id"
              name="borrow"
              placeholder="Borrow id"
              defaultValue={inputFieldValue?.borrow}
              fieldErrors={error?.borrow ?? []}
              onChange={(e: any) => {
                handleFieldChange("borrow", e.target.value);
              }}
            />

            <InputField
              type="number"
              label="Amount"
              name="amount"
              fieldErrors={error?.amount ?? []}
              onChange={(e)=>{
                handleSelectChange("amount",{
                  value:e.target.value
                });
              }}
            />

              <InputField
                type="text"
                label="Payment Method"
                name="payment_method"
                placeholder="cash , esewa or khalti"
                // defaultValue={inputFieldValue?.description}
                fieldErrors={error?.payment_method ?? []}
                onChange={(e: any) => {
                  handleFieldChange("payment_method", e.target.value);
                }}
              />
          </div>

          <div className="bg-white sticky left-4 bottom-0 right-4 pt-6 border-gray-200 flex items-end  justify-between">
            <Btn
              outline="error"
              onClick={() => {
                setShowPopUpModal(false);
                setInputFieldValue({});
                setError({});
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

export default AddFine;
