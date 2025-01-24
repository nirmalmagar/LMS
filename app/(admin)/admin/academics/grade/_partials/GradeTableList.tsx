"use client";
import React, { FormEvent, useState } from "react";
import useSWR from "swr";
import { toast } from "react-toastify";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { accessToken } from "@/helpers/TokenHelper";
import AddGrade from "./AddGrade";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import Modal from "@/components/Elements/Modal";
import InputField from "@/components/Form/InputForm";
import Btn from "@/components/Btn";
import { defaultFetcher } from "@/helpers/FetchHelper";
import Pagination from "@/components/Pagination/Pagination";

interface ShowHeading {
  showHeading?: boolean;
  showMore?: boolean;
  data: Record<string, any>[];
  mutate: () => void;
}

const GradeTableList: React.FC<ShowHeading> = ({
  showHeading,
  showMore,
  data,
  mutate,
}) => {
  let heading = showHeading;
  // const [showMore, setShowMore] = useState<boolean>(false);
  const [gradeId, setGradeId] = useState<number>();
  const [showPopUpModal, setShowPopUpModal] = useState<boolean>(false);

  const GradeURL = `${process.env.HOST}grades/${gradeId}`;
  const { data: gradeIdList, mutate: editMutate } = useSWR(
    GradeURL,
    defaultFetcher
  );
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
            const response = await fetch(`${process.env.HOST}grades/${id}/`, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${accessToken()}`,
                "Content-Type": "application/json",
                Accept: "application/json", // Fixed typo here
              },
            });
            if (response.ok) {
              toast.success("Genre removed successfully.");
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
    setGradeId(id);
  };
  const handleCloseTap = () => {
    setShowPopUpModal(false);
  };
  // edit handle submit
  const handleEditGrade = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      const response = await fetch(`${process.env.HOST}grades/${gradeId}/`, {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${accessToken()}`,
          Accept: "application/json",
        },
      });
      // const data = await response.json();
      if (response.ok) {
        toast.success("grade update successfully ");
        mutate?.();
        editMutate();
      } else {
        toast.error("some thing went wrong");
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
        modalTitle="Add Grade"
        size="lg"
      >
        <form id="lead-form" onSubmit={handleEditGrade}>
          <div className=" px-4 py-4 rounded-lg border border-gray-200">
            <InputField
              type="text"
              label="Grade"
              name="name"
              placeholder="enter grade"
              defaultValue={gradeIdList?.name}
              // onChange={(e: any) => {
              //   handleFieldChange("name", e.target.value);
              // }}
            />
          </div>

          <div className="bg-white sticky left-4 bottom-0 right-4 pt-6 border-gray-200 flex items-end  justify-between">
            <Btn
              outline="error"
              onClick={() => {
                setShowPopUpModal(false);
                // setInputFieldValue({});
              }}
            >
              Cancel
            </Btn>

            <div className="flex gap-x-4">
              <Btn
                type="submit"
                className="bg-blue-600 text-white"
                onClick={() => {
                  setShowPopUpModal(false);
                }}
              >
                Edit
              </Btn>
            </div>
          </div>
        </form>
      </Modal>

      <div className="mt-8 max-w-[500px] rounded-3xl bg-white pb-2.5 px-2 pt-2 shadow-default sm:px-7.5 xl:pb-1">
        {heading && <AddGrade mutate={mutate}/>}
        <div className="max-w-[500px] overflow-x-auto">
          <table className="w-full text-sm table-auto">
            <thead>
              <tr className="border-b-2 text-left">
                <th className="py-4 px-2 font-medium text-black">S.N</th>
                <th className="min-w-[20px] py-4 px-2 font-medium text-black">
                  Grade
                </th>
                <th className="min-w-[20px] py-4 px-2 font-medium text-black">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.results?.map(
                (gradeValue: Record<string, any>, index: number) => {
                  return (
                    <tr key={index}>
                      <td className="border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                        <h5 className="font-medium text-black">{index + 1}</h5>
                      </td>
                      <td className="min-w-[80px] border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                        <p className="text-black" id="card_title">
                          {gradeValue.name}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                        <p className="text-black">
                          <button
                            className="hover:text-red"
                            onClick={() => showSwal(gradeValue?.id)}
                          >
                            <TrashIcon className="h-[18px] w-[18px] hover:text-red-500" />
                          </button>
                          <button
                            className="ml-3"
                            onClick={() => editIconBox(gradeValue?.id)}
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
          {/* <Pagination total_Pages={data?.total_pages} current_Page={data?.current_page} results={data?.results} mutate={mutate} /> */}
        </div>
      </div>
    </>
  );
};

export default GradeTableList;
