"use client";
import React, { FormEvent, useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import { toast } from "react-toastify";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { accessToken } from "@/helpers/TokenHelper";
import AddNotification from "./AddNotification";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import Modal from "@/components/Elements/Modal";
import InputField from "@/components/Form/InputForm";
import Btn from "@/components/Btn";
import { defaultFetcher } from "@/helpers/FetchHelper";
import DateToString from "@/components/DateConverter/DateToString";
import SelectField from "@/components/Form/SelectField";
import { collectionToOptions } from "@/helpers/CollectionOption";


interface ShowHeading {
  showHeading?: boolean;
  showMore?: boolean;
  data: Record<string, any>[];
  mutate: () => void;
}

const NotificationTable: React.FC<ShowHeading> = ({
  showHeading,
  showMore,
  data,
  mutate,
}) => {
  let heading = showHeading;
  let showLists = showMore;

  // const [showMore, setShowMore] = useState<boolean>(false);
  const [notificationsLists, setNotificationsLists] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState<number>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [notificationId, setNotificationId] = useState<number>();
  const [showPopUpModal, setShowPopUpModal] = useState<boolean>(false);
  const [error, setError] = useState<Record<string, any>>({});
  const [selectValues, setSelectValues] = useState<Record<string, any>>({});

  const NotificationURL = `${process.env.HOST}notifications/${notificationId}/`;
  const { data: notificationList, mutate: editMutate } = useSWR(
    NotificationURL,
    defaultFetcher
  );

  const userURL = `${process.env.HOST}user/`;
  const { data: userData } = useSWR(userURL, defaultFetcher);
  const userOption = collectionToOptions(
    userData?.results ? userData?.results : []
  );

  function handleSelectChange(name: string, choice: Record<string, any>) {
    const key = name;
    const value = choice?.value;
    setSelectValues((values) => ({ ...values, [key]: value }));
  }

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
            const response = await fetch(
              `${process.env.HOST}notifications/${id}/`,
              {
                method: "DELETE",
                headers: {
                  Authorization: `Bearer ${accessToken()}`,
                  "Content-Type": "application/json",
                  Accept: "application/json", // Fixed typo here
                },
              }
            );
            if (response.ok) {
              toast.success("Notification removed successfully.");
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
    setNotificationId(id);
  };
  const handleCloseTap = () => {
    setShowPopUpModal(false);
    setError({});
  };

  // edit handle submit
  const handleEditNotification = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      const response = await fetch(
        `${process.env.HOST}notifications/${notificationId}/`,
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
        toast.success("Notification update successfully ");
        mutate();
        editMutate();
        setError({});
        setShowPopUpModal(false);
      } else {
        setError(data);
      }
    } catch (e: any) {
      console.error(e);
    }
  };

  console.log("time",notificationList);

  // pagination number lists in array
  let totalPageArray = notificationsLists
    ? Array.from({ length: totalPages }, (_, index) => index + 1)
    : [];

  // pagination
  let paginationLinks =
    notificationsLists &&
    totalPageArray.map((items: any, index: number) => {
      if (items < 10) {
        return (
          <span
            key={index}
            onClick={() => setCurrentPage(items)}
            className={`page-item ${
              currentPage === items ? "active" : ""
            } mx-0.5 text-xs cursor-pointer px-1.5`}
          >
            {items}
          </span>
        );
      }
    });

  // handle page change
  const handlePageChange = (page: number) => {
    if (currentPage >= 1 && currentPage <= 10) {
      setCurrentPage(page);
    }
  };
  useEffect(() => {
    mutate();
  }, [currentPage, mutate]);

  
  return (
    <>
      {/* edit Model popup  */}
      <Modal
        show={showPopUpModal}
        handleClose={handleCloseTap}
        modalTitle="Edit Notification"
        size="lg"
      >
        <form id="lead-form" onSubmit={handleEditNotification}>
          <div className=" px-4 py-4 rounded-lg border border-gray-200">
          <SelectField
                className="w-full ml-40"
                options={userOption}
                label="Users"
                value={selectValues?.user}
                defaultValue={notificationList?.user}
                fieldErrors={error?.user ?? []}
                onChange={(e) => {
                  handleSelectChange("user", {
                    value: e.target.value,
                  });
                }}
              />
            <InputField
              type="date"
              label="Timestamp"
              name="timestamp"
              placeholder="enter timestamp"
              value={selectValues?.timestamp}
              fieldErrors={error?.timestamp ?? []}
              defaultValue={notificationList?.timestamp}
            />
            <InputField
              type="textarea"
              label="message"
              name="message"
              placeholder="enter grade"
              defaultValue={notificationList?.message}
              fieldErrors={error?.message ?? []}
            />
          </div>
          <div className="bg-white sticky left-4 bottom-0 right-4 pt-6 border-gray-200 flex items-end  justify-between">
            <Btn
              outline="error"
              onClick={() => {
                setShowPopUpModal(false);
                setError({});
                // setInputFieldValue({});
              }}
            >
              Cancel
            </Btn>

            <div className="flex gap-x-4">
              <Btn type="submit" className="bg-blue-600 text-white">
                Edit
              </Btn>
            </div>
          </div>
        </form>
      </Modal>

      <div className="mt-8 max-w-[1000px] rounded-3xl bg-white pb-2.5 px-2 pt-2 shadow-default sm:px-7.5 xl:pb-1">
        {heading && <AddNotification mutate={mutate} />}
        <div className="max-w-[1000px] overflow-x-auto">
          <table className="w-full text-sm table-auto">
            <thead>
              <tr className="border-b-2 text-left">
                <th className="py-4 px-2 font-medium text-black">S.N</th>
                <th className="min-w-[20px] py-4 px-2 font-medium text-black">
                  User
                </th>
                <th className="min-w-[20px] py-4 px-2 font-medium text-black">
                  Message
                </th>
                <th className="min-w-[20px] py-4 px-2 font-medium text-black">
                  Time Stamp
                </th>
                <th className="min-w-[20px] py-4 px-2 font-medium text-black">
                  Is Read
                </th>
                <th className="min-w-[20px] py-4 px-2 font-medium text-black">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.results?.map(
                (notificationsItems: Record<string, any>, index: number) => {
                  return (
                    <tr key={index}>
                      <td className="border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                        <h5 className="font-medium text-black">{index + 1}</h5>
                      </td>
                      <td className="min-w-[80px] border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                        <p className="text-black" id="card_title">
                          {notificationsItems?.user}
                        </p>
                      </td>
                      <td className="min-w-[80px] border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                        <p className="text-black" id="card_title">
                          {notificationsItems?.message}
                        </p>
                      </td>
                      <td className="min-w-[80px] border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                        <p className="text-black" id="card_title">
                        <DateToString inputDate={notificationsItems?.timestamp} />
                        </p>
                      </td>
                      <td className="min-w-[80px] border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                        <p className="text-black" id="card_title">
                          {notificationsItems?.is_read ? "read" : "not read"}
                        </p>
                      </td>

                      <td className="border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                        <p className="text-black">
                          <button
                            className="hover:text-red"
                            onClick={() => showSwal(notificationsItems?.id)}
                          >
                            <TrashIcon className="h-[18px] w-[18px] hover:text-red-500" />
                          </button>
                          <button
                            className="ml-3"
                            onClick={() => editIconBox(notificationsItems?.id)}
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
          <div className="text-sm float-right m-4 flex items-center text-red-400 font-semibold">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <MdChevronLeft className="w-5 h-5" />
            </button>
            {paginationLinks}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <MdChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationTable;
