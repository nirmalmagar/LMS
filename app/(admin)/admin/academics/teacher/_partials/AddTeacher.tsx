"use client";
import React from "react";
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

const AddTeacher = () => {
  const [showPopUpModal, setShowPopUpModal] = useState<boolean>(false);
  const [selectValues, setSelectValues] = useState<Record<string, any>>({});
  const [inputFieldValue, setInputFieldValue] = useState<
    Record<string, string>
  >({});

  function handleSelectChange(name: string, choice: Record<string, any>) {
    const key = name;
    const value = choice?.value;
    setSelectValues((values) => ({ ...values, [key]: value }));
  }

  const gradeUser = `${process.env.HOST}grades/`;
  const { data: gradeData } = useSWR(gradeUser, defaultFetcher);
  const gradeOption = collectionToOptions(
    gradeData?.results ? gradeData?.results : []
  );

  const userURL = `${process.env.HOST}user/`;
  const { data: userData } = useSWR(userURL, defaultFetcher);
  const userOption = collectionToOptions(
    userData?.results ? userData?.results : []
  );

  const departmentURL = `${process.env.HOST}departments/`;
  const { data: departmentData } = useSWR(departmentURL, defaultFetcher);
  const departmentOption = collectionToOptions(
    departmentData?.results ? departmentData?.results : []
  );

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
      user : selectValues?.user,
      employee_id : inputFieldValue?.employee_id,
      grade : selectValues?.grade,
      department : selectValues?.department,
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
      setSelectValues({});
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
          <SelectField
                className="w-full"
                options={userOption}
                label="User"
                value={selectValues?.user}
                defaultValue={""}
                onChange={(e) => {
                  handleSelectChange("user", {
                    value: e.target.value,
                  });
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
            <SelectField
                className="w-full"
                options={gradeOption}
                label="grade"
                value={selectValues?.grade}
                defaultValue={""}
                onChange={(e) => {
                  handleSelectChange("grade", {
                    value: e.target.value,
                  });
                }}
              />

            <SelectField
                className="w-full"
                options={departmentOption}
                label="Department"
                value={selectValues?.department}
                onChange={(e) => {
                  handleSelectChange("department", {
                    value: e.target.value,
                  });
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

export default AddTeacher;
