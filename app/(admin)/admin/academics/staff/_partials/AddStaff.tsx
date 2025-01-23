"use client";
import React from "react";
import Modal from "@/components/Elements/Modal";
import TableHead from "@/components/Elements/TableHead/TableHead";
import { useState, FormEvent } from "react";
import InputField from "@/components/Form/InputForm";
import Btn from "@/components/Btn";
import { accessToken } from "@/helpers/TokenHelper";
import { toast } from "react-toastify";
import Multiselect from "multiselect-react-dropdown";
import useSWR from "swr";
import { defaultFetcher } from "@/helpers/FetchHelper";
import SelectField from "@/components/Form/SelectField";
import { collectionToOptions } from "@/helpers/CollectionOption";

interface ShowHeading {
  // showHeading?: boolean;
  // showMore?: boolean;
  // data: Record<string,any>[];
  mutate: () => void;
}
interface genresListProps {
  id: number;
  name: string;
}

const AddStaff: React.FC<ShowHeading> = ({ mutate }) => {
  const [showPopUpModal, setShowPopUpModal] = useState<boolean>(false);
  const [selectValues, setSelectValues] = useState<Record<string, any>>({});
  const [inputFieldValue, setInputFieldValue] = useState<
    Record<string, any>
  >({});
  const [selectLibrarySection, setSelectLibrarySection] = useState<number[]>(
    []
  ); // Array to store selected genre IDs
  const [error, setError] = useState<Record<string, any>>({});

  const LibraryURL = `${process.env.HOST}library-sections/`;
  const { data: libraryData } = useSWR(LibraryURL, defaultFetcher);
  const libraryList = libraryData?.results;

  // const libraryURL = `${process.env.HOST}library-sections/`;
  // const { data: libraryData } = useSWR(libraryURL, defaultFetcher);
  // const libraryOption = collectionToOptions(
  //   libraryData?.results ? libraryData?.results : []
  // );

  // Callback for when an item is selected
  const handleSelect = (selectedList: genresListProps[]) => {
    const ids = selectedList.map((genre) => genre.id); // Extract IDs from selected items
    setSelectLibrarySection(ids); // Update state
  };

  // Callback for when an item is removed
  const handleRemove = (selectedList: genresListProps[]) => {
    const ids = selectedList.map((genre) => genre.id); // Extract IDs from remaining items
    setSelectLibrarySection(ids); // Update state
  };

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

  function handleSelectChange(name: string, choice: Record<string, any>) {
    const key = name;
    const value = choice?.value;
    setSelectValues((values) => ({ ...values, [key]: value }));
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

  // book add button
  const handleAddStaff = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const InputFileData = {
      user: selectValues?.user,
      employee_id: inputFieldValue?.employee_id,
      department: selectValues?.department,
      role: inputFieldValue?.role,
      authorized_sections: selectLibrarySection,
      // authorized_sections: selectValues?.authorized_sections,
      tasks: inputFieldValue?.tasks,
      borrowing_period_days: inputFieldValue?.borrowing_period_days,
    };
    try {
      const response = await fetch(`${process.env.HOST}staffs/`, {
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
        toast.success("Add staff successfully");
        setInputFieldValue({});
        setSelectValues({});
        setShowPopUpModal(false);
        mutate();
      } else {
        setError(data)
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
              <SelectField
                // className="w-full ml-40"
                options={userOption}
                label="Users"
                value={selectValues?.user}
                fieldErrors={error?.user ?? []}
                defaultValue={""}
                onChange={(e) => {
                  handleSelectChange("user", {
                    value: e.target.value,
                  });
                }}
              />

            <InputField
              type="text"
              label="Employee Id"
              name="employee_id"
              placeholder="enter department head name"
              // defaultValue={inputFieldValue?.employee_id}
              fieldErrors={error?.employee_id ?? []}
              onChange={(e: any) => {
                handleFieldChange("employee_id", e.target.value);
              }}
            />
            <SelectField
              className="w-full"
              options={departmentOption}
              label="Department"
              value={selectValues?.department}
              defaultValue={""}
              fieldErrors={error?.department}
              onChange={(e) => {
                handleSelectChange("department", {
                  value: e.target.value,
                });
              }}
            />

            <InputField
              type="text"
              label="Role"
              name="role"
              placeholder="enter department head name"
              // defaultValue={inputFieldValue?.role}
              onChange={(e: any) => {
                handleFieldChange("role", e.target.value);
              }}
              fieldErrors={error?.role}
            />

            <div className="flex gap-[70px]">
              <label htmlFor="" className="text-[15px]">
                Authorized
              </label>
              <Multiselect
                placeholder="selcet library sections"
                className="text-sm leading-4 w-full flex-1"
                options={libraryList} // Data to display
                displayValue="name" // The key to display (update based on your object structure)
                onSelect={handleSelect} // Callback for when an item is selected
                onRemove={handleRemove} // Callback for when an item is removed
              />
            </div>

            {/* <SelectField
              className="w-full"
              options={libraryOption}
              label="authorized section"
              value={selectValues?.authorized_sections}
              defaultValue={""}
              onChange={(e) => {
                handleSelectChange("authorized_sections", {
                  value: e.target.value,
                });
              }}
            /> */}
            <InputField
              type="text"
              label="Tasks"
              name="tasks"
              placeholder="enter tasks"
              // defaultValue={inputFieldValue?.borrowing_period_days}
              fieldErrors={error?.tasks}
              onChange={(e: any) => {
                handleFieldChange("tasks", e.target.value);
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
