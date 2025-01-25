"use client";
import React from "react";
import Cookies from "js-cookie";
import useSWR from "swr";
import { defaultFetcher } from "@/helpers/FetchHelper";

const WelcomeBanner = () => {
  const user_id = Cookies.get("STUDENT_ID");
  const userURL = `${process.env.HOST}user/${user_id}`;
  const { data: userList, isLoading } = useSWR(userURL, defaultFetcher);

  const borrowURL = `${process.env.HOST}borrow/user-borrow-list/?user=${user_id}`;
  const { data: borrowList, mutate: mutateBorrowList } = useSWR(borrowURL, defaultFetcher);

  return (
    <div className="font-bold bg-blue-200 text-2xl rounded-md p-4 w-full shadow-md shadow-blue-200 col-span-3">
      {isLoading ? (
        <div className="text-sm">loading....</div>
      ) : (
        <div>Welcome! {userList?.name}</div>
      )}
    </div>
  );
};

export default WelcomeBanner;
