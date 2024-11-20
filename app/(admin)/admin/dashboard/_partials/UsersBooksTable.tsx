"use client";
import React from "react";
import { defaultFetcher } from "@/helpers/FetchHelper";
import { EllipsisHorizontalIcon, TrashIcon } from "@heroicons/react/24/outline";
import useSWR, { mutate } from "swr";
import { toast } from "react-toastify";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { accessToken } from "@/helpers/TokenHelper";
import Image from "next/image";
import AddBookLists from "./AddBookLists";

const UserasBooksTable = () => {
  const BooksListURL = `${process.env.HOST}books/`;
  const { data: booksData } = useSWR(BooksListURL, defaultFetcher);

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
            const response = await fetch(`${process.env.HOST}books/${id}/`, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${accessToken()}`,
                "Content-Type": "application/json",
                Accept: "application/json", // Fixed typo here
              },
            });
            if (response.ok) {
              toast.success("Genre removed successfully.");
              mutate(BooksListURL);
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

  // console.log("booksList?.Genres?.name",booksData?.results[0]?.genres[0]?.name)

  return (
    // dark:border-strokedark dark:bg-boxdark
    <div className="mt-8 rounded-3xl bg-white pb-2.5 px-2 pt-2 shadow-default sm:px-7.5 xl:pb-1">
        <AddBookLists />
      <div className="max-w-full overflow-x-auto">
        <table className="w-full text-sm table-auto">
          <thead>
            {/* dark:bg-meta-4 */}
            <tr className="border-b-2 text-left">
              <th className="py-4 px-2 font-medium text-black">S.N</th>
              <th className="min-w-[80px] py-4 px-2 font-medium text-black">
                Cover
              </th>
              <th className="min-w-[120px] py-4 px-2 font-medium text-black">
                Title
              </th>
              <th className="max-w-[120px] py-4 px-2 font-medium text-black">
                Author
              </th>
              <th className="min-w-[120px] py-4 px-2 font-medium text-black">
                Publisher
              </th>
              <th className="min-w-[66px] py-4 px-2 font-medium text-black">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {booksData?.results?.slice(0,5).map(
              (booksList: Record<string, any>, index: number) => {
                return (
                  <tr key={index}>
                    <td className="border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                      <h5 className="font-medium text-black">{index + 1}</h5>
                    </td>
                    <td className="border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                      <div className="relative w-12 h-12">
                        <Image
                          src={booksList?.cover}
                          className="rounded"
                          fill
                          objectFit="cover"
                          alt={booksList?.title}
                        />
                      </div>
                    </td>
                    <td className="border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                      <p className="text-black ">{booksList.title}</p>
                    </td>
                    <td className="border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                      <p className="text-black " id="card_title">{booksList?.author}</p>
                    </td>
                    <td className="border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                      <p className="text-black">{booksList?.publisher}</p>
                    </td>
                    {/* <td className="border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                      <p className="text-black">{booksList?.Genres?.name}</p>
                    </td>
                    <td className="border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                      <p className="text-black">
                        {booksList?.created_by
                          ? booksList?.created_by
                          : booksList?.name}
                      </p>
                    </td> */}
                    <td className="border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                      <p className="text-black text-center">
                        <button
                          className="hover:text-red"
                          onClick={() => showSwal(booksList?.id)}
                        >
                          {/* <EllipsisHorizontalIcon className="ml-2 cursor-pointer w-8 h-6" /> */}
                          <TrashIcon className="h-[18px] w-[18px]" />
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
  );
};

export default UserasBooksTable;
