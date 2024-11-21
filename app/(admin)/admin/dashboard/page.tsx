"use client";
import React, { useEffect, useRef, useState } from "react";
import DefaultLayout from "@/components/Layouts/Navbar/DefaultLayout";
import DashboardCard from "@/components/Elements/Dashboard/DashboardCard";
import TryUsersBooksTable from "./_partials/TryUsersBooksTable";
import { HiOutlineUsers } from "react-icons/hi2";
import { IoBookOutline } from "react-icons/io5";
import { MdPendingActions, MdPeopleOutline } from "react-icons/md";

const page = () => {
  // const [booksList, setBooksList] = useState({});
  // useEffect(() => {
  //   // Fetch data from the API
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(`${process.env.HOST}books/`);
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       const data = await response.json();
  //       setBooksList(data);
  //       // setBooks(data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);
  // let flag = useRef(true);
  // useEffect(() => {
  //   if (!flag) {
  //     console.log("call me !!");
  //   }
  // }, []);

  return (
    <div>
      <DefaultLayout>
        <div className="grid grid-cols-4 gap-8">
          <DashboardCard totalList={340} title={"Total Visitors"}>
            {
              <HiOutlineUsers className="w-10 h-10 p-2 rounded-full bg-red-400" />
            }
          </DashboardCard>
          <DashboardCard totalList={240} title={"Borrowed Books"}>
            {
              <IoBookOutline className="w-10 h-10 p-2 rounded-full bg-red-400" />
            }
          </DashboardCard>
          <DashboardCard totalList={560} title={"Overdue Books"}>
            {
              <MdPendingActions className="w-10 h-10 p-2 rounded-full bg-red-400" />
            }
          </DashboardCard>
          <DashboardCard totalList={770} title={"New Members"}>
            {
              <MdPeopleOutline className="w-10 h-10 p-2 rounded-full bg-red-400" />
            }
          </DashboardCard>
        </div>
        <div className="flex gap-8">
          <div>
            <TryUsersBooksTable />
          </div>
          <div>
            <TryUsersBooksTable />
          </div>
        </div>
      </DefaultLayout>
    </div>
  );
};
export default page;
