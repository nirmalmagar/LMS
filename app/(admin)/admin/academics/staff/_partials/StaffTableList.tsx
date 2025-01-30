"use client";
import React, { FormEvent, useState } from "react";
import useSWR from "swr";
import { toast } from "react-toastify";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { accessToken } from "@/helpers/TokenHelper";
import AddStaff from "./AddStaff";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import Modal from "@/components/Elements/Modal";
import InputField from "@/components/Form/InputForm";
import Btn from "@/components/Btn";
import { defaultFetcher } from "@/helpers/FetchHelper";
import SelectField from "@/components/Form/SelectField";
import { collectionToOptions } from "@/helpers/CollectionOption";
import Multiselect from "multiselect-react-dropdown";
import { DepartmentId, LibraryId, UserId } from "@/components/IdToName/IdToName";

interface ShowHeading {
  showHeading?: boolean;
  showMore?: boolean;
  data: Record<string,any>[];
  mutate: ()=>void;
}

interface genresListProps {
  id: number;
  name: string;
}

const StaffTableList: React.FC<ShowHeading> = ({ showHeading, showMore, data , mutate }) => {
  let heading = showHeading;
  let showLists = showMore;

  // const [showMore, setShowMore] = useState<boolean>(false);
  const [staffList, setStaffList] = useState<any[]>([]);
  const [staffId, setStaffId] = useState<number>();
  const [showPopUpModal, setShowPopUpModal] = useState<boolean>(false);
  const [selectLibrarySection, setSelectLibrarySection] = useState<number[]>([]); // Array to store selected genre IDs
  const [selectValues, setSelectValues] = useState<Record<string, any>>({});
  const [error, setError] = useState<Record<string,any>>({});
  
  const LibraryURL = `${process.env.HOST}library-sections/`;
  const { data: libraryData } = useSWR(LibraryURL, defaultFetcher);
  const libraryList = libraryData?.results;

  // authorization section list in array
  // const LibraryURL = `${process.env.HOST}library-sections/`;
  // const { data: LibraryData } = useSWR(LibraryURL, defaultFetcher);
  // const libraryOption = collectionToOptions(
  //   LibraryData?.results ? LibraryData?.results : []
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

  const StaffURL = `${process.env.HOST}staffs/${staffId}`;
  const { data: staffIdList } = useSWR(StaffURL, defaultFetcher);
  
  // delete popup model
  const showSwal = (id: string) => {
    withReactContent(Swal)
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, remove it!",
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await fetch(`${process.env.HOST}staffs/${id}/`, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${accessToken()}`,
                "Content-Type": "application/json",
                Accept: "application/json", // Fixed typo here
              },
            });
            if (response.ok) {
              toast.success("Staff removed successfully.");
              mutate();
            } else {
              const result = await response.json();
              toast.error(result.message ?? "Something went wrong!");
            }
          } catch (err) {
            toast.error("Something went wrong!");
          }
        }
      });
  };

  // edit icons box
  const editIconBox = (id: number) => {
    setShowPopUpModal(true);
    setStaffId(id);
  };
  const handleCloseTap = () => {
    setError({})
    setShowPopUpModal(false);
  };
  // edit handle submit
  const handleEditStaff = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set(
      "user",
      selectValues?.user
        ? selectValues?.user
        : staffIdList?.user
    );
  
    formData.append(
      "authorized_sections",
      selectValues?.authorized_sections
        ? selectValues?.authorized_sections
        : staffIdList?.authorized_sections
    );
    // formData.set(
    //   "authorized_sections",
    //   selectValues?.authorized_sections
    //     ? selectValues?.authorized_sections
    //     : staffIdList?.authorized_sections
    // );
    try {
      const response = await fetch(
        `${process.env.HOST}staffs/${staffId}/`,
        {
          method: "PUT",
          body: formData,
          headers: {
            Authorization: `Bearer ${accessToken()}`,
            Accept: "application/json",
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        toast.success("Staff update successfully ");
        setShowPopUpModal(false);
      } else {
        setError(data)
        toast.error("some thing went wrong",data?.authorized_sections);
      }
    } catch (e: any) {
      console.error(e);
    }
  };
  return (
    <>
      {/* edit Model popup  */}
      <Modal
        show={showPopUpModal}
        handleClose={handleCloseTap}
        modalTitle="Edit Staff"
        size="lg"
      >
        <form id="lead-form" onSubmit={handleEditStaff}>
          <div className=" px-4 py-4 rounded-lg border border-gray-200">
          <div className="w-full">
              <SelectField
                className="w-full ml-40"
                options={userOption}
                label="Users"
                value={selectValues?.user}
                defaultValue={staffIdList?.user?.id}
                fieldErrors={error?.user ??[]}
                onChange={(e) => {
                  handleSelectChange("user", {
                    value: e.target.value,
                  });
                }}
              />
            </div>

            <InputField
              type="text"
              label="Employee name"
              name="employee_id"
              placeholder="Choose Employee name"
              fieldErrors={error?.employee_id ?? []}
              defaultValue={staffIdList?.employee_id}
            />
            <SelectField
                className="w-full"
                options={departmentOption}
                label="Department"
                value={selectValues?.department}
                defaultValue={staffIdList?.department?.id as string}
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
              placeholder="Enter role"
              fieldErrors={error?.role ?? []}
              defaultValue={staffIdList?.role}
            />
            <div className="flex gap-[70px]">
              <label htmlFor="" className="text-[15px]">Authorized</label>
              <Multiselect
                selectedValues={staffIdList?.authorized_sections as string}
                // placeholder="selcet library sections"
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
                label="Authorized"
                value={selectValues?.authorized}
                defaultValue={staffIdList?.authorized_sections?.id }
                fieldErrors={error?.authorized_sections}
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
              placeholder="Enter tasks"
              defaultValue={staffIdList?.tasks}
            />
            <InputField
              type="number"
              label="borrowing days"
              name="borrowing_period_days"
              placeholder="enter grade"
              defaultValue={staffIdList?.borrowing_period_days}
            />
          </div>
          <div className="bg-white sticky left-4 bottom-0 right-4 pt-6 border-gray-200 flex items-end  justify-between">
            <Btn
              outline="error"
              onClick={() => {
                setShowPopUpModal(false);
                setError({})
              }}
            >
              Cancel
            </Btn>

            <div className="flex gap-x-4">
              <Btn
                type="submit"
                className="bg-blue-600 text-white"
              >
                Edit
              </Btn>
            </div>
          </div>
        </form>
      </Modal>
        <div className="mt-8 max-w-full rounded-3xl bg-white pb-2.5 px-2 pt-2 shadow-default sm:px-7.5 xl:pb-1">
          {heading && <AddStaff mutate={mutate} />}
          <div className="max-w-full overflow-x-auto">
            <table className="w-full text-sm table-auto">
              <thead>
                <tr className="border-b-2 text-left">
                  <th className="py-4 px-2 font-medium text-black">S.N</th>
                  <th className="min-w-[20px] py-4 px-2 font-medium text-black">
                    User
                  </th>
                  <th className="min-w-[20px] py-4 px-2 font-medium text-black">
                    Employee name
                  </th>
                  <th className="min-w-[20px] py-4 px-2 font-medium text-black">
                    Department
                  </th>
                  <th className="min-w-[20px] py-4 px-2 font-medium text-black">
                    Role
                  </th>
                  <th className="min-w-[20px] py-4 px-2 font-medium text-black">
                    authorized section
                  </th>
                  <th className="min-w-[20px] py-4 px-2 font-medium text-black">
                    Tasks
                  </th>
                  <th className="min-w-[20px] py-4 px-2 font-medium text-black">
                    Borrow days
                  </th>
                  <th className="min-w-[20px] py-4 px-2 font-medium text-black">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.results?.map(
                  (staffItem: Record<string, any>, index: number) => {
                    return (
                      <tr key={index}>
                        <td className="border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                          <h5 className="font-medium text-black">
                            {index + 1}
                          </h5>
                        </td>
                        <td className="min-w-[80px] border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                          <p className="text-black" id="card_title">
                            <UserId Id={staffItem.user}/>
                          </p>
                        </td>
                        <td className="min-w-[80px] border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                          <p className="text-black" id="card_title">
                            {staffItem.employee_id}
                          </p>
                        </td>
                        <td className="min-w-[80px] border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                          <p className="text-black" id="card_title">
                            <DepartmentId Id={staffItem.department} />
                          </p>
                        </td>
                        <td className="min-w-[80px] border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                          <p className="text-black" id="card_title">
                            {staffItem.role}
                          </p>
                        </td>
                        <td className="min-w-[70px] border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                          <p className="text-black" id="card_title">
                            {staffItem.authorized_sections ? <LibraryId Id={staffItem.authorized_sections[0]} /> : "---" }
                          </p>
                        </td> 
                        <td className="min-w-[80px] border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                          <p className="text-black" id="card_title">
                            {staffItem.tasks}
                          </p>
                        </td>
                        <td className="min-w-[80px] border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                          <p className="text-black" id="card_title">
                            {staffItem.borrowing_period_days}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-2 dark:border-strokedark">
                          <p className="text-black">
                            <button
                              className="hover:text-red"
                              onClick={() => showSwal(staffItem?.id)}
                            >
                              <TrashIcon className="h-[18px] w-[18px] hover:text-red-500" />
                            </button>
                            <button
                              className="ml-3"
                              onClick={() => editIconBox(staffItem?.id)}
                            >
                              <PencilSquareIcon className="h-[18px] w-[18px] hover:text-blue-700" />
                            </button>
                          </p>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
        </div>
    </>
  );
};

export default StaffTableList;
