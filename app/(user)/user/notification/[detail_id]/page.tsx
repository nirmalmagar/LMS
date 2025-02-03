"use client";
import React from "react";
import DefaultLayout from "@/components/Layouts/UserNavbar/DefaultLayout";
import useSWR from "swr";
import { getFetcher } from "@/helpers/FetchHelper";
import DateToString from "@/components/DateConverter/DateToString";

const page = ({ params }: { params: { detail_id: string } }) => {
  const notify_id = params?.detail_id;
  const { data: notificationsList, isLoading } = useSWR(
    `${process.env.HOST}notifications/${notify_id}/`,
    getFetcher
  );

  return (
    <DefaultLayout>
      {isLoading ? (
        <p className="text-xl bg-white h-96 flex items-center justify-center mt-8 rounded-2xl">
          <span>Loading...</span>
        </p>
      ) : (
        <div className="mt-8 rounded-3xl bg-white pb-2.5 px-2 pt-2 shadow-default sm:px-7.5 xl:pb-1">
          <div className="max-w-full overflow-x-auto">
            <table className="w-full text-sm table-auto">
              <thead>
                <tr className="border-b-2 text-left">
                  <th className="min-w-[120px] py-4 px-2 font-medium text-black">
                    Time Stamp
                  </th>
                  <th className="min-w-[120px] py-4 px-2 font-medium text-black">
                    Message
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-left">
                  <td className="min-w-[80px] border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                    <p className="text-black " id="card_title">
                      <DateToString inputDate={notificationsList?.timestamp} />
                    </p>
                  </td>
                  <td className="min-w-[80px] border-b border-[#eee] py-2 px-2 dark:border-strokedark">
                    <p className="text-black" id="card_title">
                      {notificationsList?.message}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </DefaultLayout>
  );
};

export default page;
