"use client";
import React from "react";
import useSWR from "swr";
import { defaultFetcher } from "@/helpers/FetchHelper";

const TableList = () => {
  const GenresListURL = `${process.env.HOST}genres/`;
  const { data: genresData } = useSWR(GenresListURL, defaultFetcher);
  // const showSwal = (id: string) => {
  //   withReactContent(Swal)
  //     .fire({
  //       title: "Are you sure?",
  //       text: "You won't be able to revert this!",
  //       icon: "warning",
  //       showCancelButton: true,
  //       confirmButtonColor: "#d33",
  //       cancelButtonColor: "#3085d6",
  //       confirmButtonText: "Yes, remove it!",
  //     })
  //     .then(async (result) => {
  //       if (result.isConfirmed) {
  //         try {
  //           const response = await fetch(
  //             `${process.env.HOST}/api/blog-faqs/delete/${id}`,
  //             {
  //               method: "DELETE",
  //               headers: {
  //                 Authorization: `Bearer ${accessToken()}`,
  //                 "Content-Type": "application/json",
  //                 Accept: "applicaton/json",
  //               },
  //             }
  //           );

  //           const result = await response.json();
  //           if (result.success) {
  //             toast.success(result.message);
  //             mutate?.();
  //           } else {
  //             toast.error(result.message ?? "Something went wrong!");
  //           }
  //         } catch (err) {
  //           toast.error("Something went wrong!");
  //         }
  //       }
  //     });
  // };
  return (
    // dark:border-strokedark dark:bg-boxdark
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            {/* dark:bg-meta-4 */}
            <tr className="bg-gray-200 text-left ">
              <th className=" px-4 py-4 font-medium text-black xl:pl-11">
                S.N
              </th>

              <th className="min-w-[120px] px-4 py-4 font-medium text-black">
                Name
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black">
                Created Date
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black">
                Modified Date
              </th>
              <th className="px-4 py-4 font-medium text-black">Creator Name</th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {genresData?.results?.map(
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
                      <p className="text-black">{genresList?.created_on}</p>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <p className="text-black">{genresList?.modified_on}</p>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <p className="text-black">
                        {genresList?.created_by 
                          ? genresList?.created_by
                          : genresList?.name}
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

export default TableList;
