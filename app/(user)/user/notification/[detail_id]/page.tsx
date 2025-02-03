"use client";
import React from "react";
import DefaultLayout from "@/components/Layouts/UserNavbar/DefaultLayout";
import useSWR from "swr";
import { getFetcher } from "@/helpers/FetchHelper";
import DateToString from "@/components/DateConverter/DateToString";
import { UserId } from "@/components/IdToName/IdToName";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import routes from "@/utils/userRoutes";

const page = ({ params }: { params: { detail_id: string } }) => {
  const notify_id = params?.detail_id;
  const { data: notificationsList, isLoading } = useSWR(
    `${process.env.HOST}notifications/${notify_id}/`,
    getFetcher
  );

  return (
    <DefaultLayout>
      {isLoading ? (
        <p className="max-w-[800px] text-xl bg-white h-96 flex items-center justify-center mt-8 rounded-2xl">
          <span>Loading...</span>
        </p>
      ) : (
        <div className="relative max-w-[800px] mt-8 rounded-3xl bg-white pb-2.5 px-2 pt-2 shadow-default sm:px-7.5 xl:pb-1 ">
        <Link href={routes.NOTIFICATION}>
          <ArrowLeftIcon className="absolute left-4 top-6 w-6 h-4" />
        </Link>
          <div className="max-w-full overflow-x-auto px-10 mt-2 py-8">
            <div className="flex justify-between pb-4 border-b-2">
              <p className="font-medium"> <UserId Id={notificationsList?.user} /></p>
              <div className="flex gap-4">
              <span className="text-sm"><DateToString inputDate={notificationsList?.timestamp} /></span>
              <span className="text-sm text-gray-600">{notificationsList?.is_read === true ? "read" : "unread"}</span>
              </div>
            </div>
            <div>
              <span className="text-sm text-gray-500">to me :</span>
            <p className="mt-2">{notificationsList?.message}</p>
            </div>
          </div>
        </div>
      )}
    </DefaultLayout>
  );
};

export default page;
