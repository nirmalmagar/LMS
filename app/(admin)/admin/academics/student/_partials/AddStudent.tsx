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

interface studentProps{
  mutate:()=>void;
}
const semesterOptions = [
  {
    value: "first",
    label: "first",
  },
  {
    value: "second ",
    label: "second",
  },
  {
    value: "third",
    label: "third",
  },
  {
    value: "fourth",
    label: "fourth",
  },
  {
    value: "fifth",
    label: "fifth",
  },
  {
    value: "sixth",
    label: "sixth",
  },
  {
    value: "seventh",
    label: "seventh",
  },
  {
    value: "eighth",
    label: "eighth",
  },
];

const AddStudent:React.FC<studentProps> = ({mutate}) => {
  const [showPopUpModal, setShowPopUpModal] = useState<boolean>(false);
  const [selectValue, setSelectValue] = useState<Record<string, any>>({});
  const [inputFieldValue, setInputFieldValue] = useState<
    Record<string, string>
  >({});
  const [error, setError] = useState<Record<string,any>>({});
  console.log("gradee", selectValue);
  const { data: userData } = useSWR(`${process.env.HOST}user/`, defaultFetcher);
  const userList = collectionToOptions(
    userData?.results ? userData?.results : []
  );

  const { data: departmentData } = useSWR(
    `${process.env.HOST}departments/`,
    defaultFetcher
  );
  const departmentOption = collectionToOptions(
    departmentData?.results ? departmentData?.results : []
  );

  const handleFieldChange = (key: string, value: string): void => {
    if (key && value) {
      setInputFieldValue((prev) => ({ ...prev, [key]: value }));
    }
  };

  function handleSelectChange(name: string, choice: Record<string, any>) {
    const key = name;
    const value = choice?.value;
    setSelectValue((prev) => ({ ...prev, [key]: value }));
  }

  const handleCloseTap = () => {
    setShowPopUpModal(false);
    setInputFieldValue({});
    setSelectValue({});
    setError({});
  };

  // book add button
  const handleAddStudent = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const InputFileData = {
      user: selectValue?.user,
      roll_number: inputFieldValue?.roll_number,
      registration_number: inputFieldValue?.registration_number,
      symbol_number: inputFieldValue?.symbol_number,
      grade: inputFieldValue?.grade,
      department: selectValue?.department,
      // semester: inputFieldValue?.semester,
      semester: selectValue?.semester,
      borrowing_period_days: inputFieldValue?.borrowing_period_days,
    };
    try {
      const response = await fetch(`${process.env.HOST}students/`, {
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
        toast.success("studnet data successfully insert");
        setInputFieldValue({});
        setSelectValue({});
        mutate();
        setShowPopUpModal(false);
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
        tableName="Student List"
        addTitle="Add Student"
        onClick={() => setShowPopUpModal(true)}
      />
      <Modal
        show={showPopUpModal}
        handleClose={handleCloseTap}
        modalTitle="Add Student"
        size="lg"
      >
        <form id="lead-form" onSubmit={handleAddStudent}>
          <div className=" px-4 py-4 rounded-lg border border-gray-200">
            <SelectField
              label="user"
              options={userList}
              defaultValue={selectValue?.user}
              value={selectValue?.user}
              fieldErrors={error?.user  ?? []}
              onChange={(e) => {
                handleSelectChange("user", {
                  value: e.target.value,
                });
              }}
            />

            <InputField
              type="number"
              label="Roll no."
              name="roll_number"
              placeholder="enter roll number"
              // defaultValue={inputFieldValue?.roll_number}
              fieldErrors={error?.roll_number  ?? []}
              onChange={(e: any) => {
                handleFieldChange("roll_number", e.target.value);
              }}
            />
            <InputField
              type="number"
              label="Registration no."
              name="registration_number"
              placeholder="Enter registration_number"
              defaultValue={inputFieldValue?.registration_number}
              fieldErrors={error?.registration_number  ?? []}
              onChange={(e: any) => {
                handleFieldChange("registration_number", e.target.value);
              }}
            />
            <InputField
              type="number"
              label="Symbol No."
              name="symbol_number"
              placeholder="Enter Symbol no."
              // defaultValue={inputFieldValue?.symbol_number}
              fieldErrors={error?.symbol_number  ?? []}
              onChange={(e: any) => {
                handleFieldChange("symbol_number", e.target.value);
              }}
            />
            <InputField
              type="text"
              label="Grade"
              name="grade"
              placeholder="enter grade"
              defaultValue={inputFieldValue?.grade}
              fieldErrors={error?.grade  ?? []}
              onChange={(e: any) => {
                handleFieldChange("grade", e.target.value);
              }}
            />
            <SelectField
              label="Department"
              options={departmentOption}
              name="department"
              value={selectValue?.department}
              defaultValue={selectValue?.department}
              fieldErrors={error?.department  ?? []}
              onChange={(e: any) => {
                handleSelectChange("department", e.target.value);
              }}
            />
            <SelectField
              label="Semester"
              options={semesterOptions}
              value={selectValue?.semester}
              defaultValue={selectValue?.semester}
              fieldErrors={error?.semester  ?? []}
              onChange={(e) => {
                handleSelectChange("semester", {
                  value: e.target.value,
                });
              }}
            />
            
            {/* <InputField
              type="text"
              label="Semester"
              name="semester"
              placeholder="enter semester"
              // defaultValue={inputFieldValue?.semester}
              fieldErrors={error?.semester  ?? []}
              onChange={(e: any) => {
                handleFieldChange("semester", e.target.value);
              }}
            /> */}
            <InputField
              type="number"
              label="Borrowing Days"
              name="borrowing_period_days"
              placeholder="enter borrowing period days"
              // defaultValue={inputFieldValue?.borrowing_period_days}
              fieldErrors={error?.borrowing_period_days  ?? []}
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
                setSelectValue({});
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

export default AddStudent;
