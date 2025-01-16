"use client";
import React from "react";
import { defaultFetcher } from "@/helpers/FetchHelper";
import { EllipsisHorizontalIcon, TrashIcon } from "@heroicons/react/24/outline";
import useSWR, { mutate } from "swr";
import { toast } from "react-toastify";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { accessToken } from "@/helpers/TokenHelper";

const UsersListTable = () => {
  const UsersListURL = `${process.env.HOST}user/`;
  const { data: usersListData } = useSWR(UsersListURL, defaultFetcher);

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
            const response = await fetch(`${process.env.HOST}genres/${id}/`, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${accessToken()}`,
                "Content-Type": "application/json",
                Accept: "application/json", // Fixed typo here
              },
            });
            if (response.ok) {
              toast.success("Genre removed successfully.");
              mutate(UsersListURL);
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
  return (
    // dark:border-strokedark dark:bg-boxdark
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            {/* dark:bg-meta-4 */}
            <tr className="bg-gray-200 text-left">
              <th className=" px-4 py-4 font-medium text-black xl:pl-11">
                S.N
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black">
                Name
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black">
                Email
              </th>
              {/* <th className="min-w-[120px] px-4 py-4 font-medium text-black">
                Action
              </th> */}
            </tr>
          </thead>
          <tbody>
            {usersListData?.results?.map(
              (genresList: Record<string, any>, index: number) => {
                return (
                  <tr key={index}>
                    <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                      <h5 className="font-medium text-black">{index + 1}</h5>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <p className="text-black">{genresList.name}</p>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <p className="text-black">{genresList.email}</p>
                    </td>
                    {/* <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <p className="">
                        <button
                          className="hover:text-red"
                          onClick={() => showSwal(genresList?.id)}
                        >
                          <TrashIcon className="h-[18px] w-[18px]" />
                        </button>
                      </p>
                    </td> */}
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersListTable;
