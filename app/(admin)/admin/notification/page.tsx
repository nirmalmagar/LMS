"use client";
import React from "react";
import DefaultLayout from "@/components/Layouts/Navbar/DefaultLayout";
import NotificationTable from "./_partials/NotificationTable";
import useSWR from "swr";
import { defaultFetcher } from "@/helpers/FetchHelper";

const page = () => {
  // `${process.env.HOST}notifications/?page=${currentPage}`
  const {
    data: notificationList,
    isLoading,
    mutate,
  } = useSWR(`${process.env.HOST}notifications/`, defaultFetcher);
  
  return (
    <DefaultLayout>
      {isLoading ? (
        <p className="text-xl bg-white h-96 flex items-center justify-center mt-8 rounded-2xl">
          <span>Loading...</span>
        </p>
      ) : (
        <NotificationTable
          showHeading={true}
          data={notificationList}
          mutate={mutate}
        />
      )}
    </DefaultLayout>
  );
};

export default page;
