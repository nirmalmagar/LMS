"use client";
import React from "react";
import DefaultLayout from "@/components/Layouts/Navbar/DefaultLayout";
import DashboardCard from "@/components/Elements/Dashboard/DashboardCard";
import UsersBooksTable from "../../books/_partials/UsersBooksTable";
import PendingBooks from "./PendingBooks";
import { HiOutlineUsers } from "react-icons/hi2";
import { MdPendingActions } from "react-icons/md";
import { CgCalendarDue } from "react-icons/cg";
import { FaPeopleGroup } from "react-icons/fa6";
import OverdueBooks from "./OverdueBooks";
import { defaultFetcher } from "@/helpers/FetchHelper";
import MostBorrowedBooks from "./MostBorrowedBooks";

import useSWR from "swr";
import TotalBooks from "./TotalBooks";

const DashboardPage = () => {
  const { data } = useSWR(
    `${process.env.HOST}dashboard/admin/`,
    defaultFetcher
  );
  return (
    <div>
      <DefaultLayout>
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-8">
          <DashboardCard
            totalList={data?.total_students}
            title={"Total Students"}
          >
            {
              <HiOutlineUsers className="w-10 h-10 p-2 rounded-full bg-red-400" />
            }
          </DashboardCard>
          <DashboardCard totalList={data?.total_staff} title={"Total Staffs"}>
            {
              <FaPeopleGroup className="w-10 h-10 p-2 rounded-full bg-red-400" />
            }
          </DashboardCard>
          <DashboardCard
            totalList={data?.overdue_books}
            title={"Overdue Books"}
          >
            {
              <CgCalendarDue className="w-10 h-10 p-2 rounded-full bg-red-400" />
            }
          </DashboardCard>
          <DashboardCard
            totalList={data?.pending_book_returns}
            title={"Pending Books"}
          >
            {
              <MdPendingActions className="w-10 h-10 p-2 rounded-full bg-red-400" />
            }
          </DashboardCard>
        </div>
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <TotalBooks />
          </div>
          <div>
            <PendingBooks />
          </div>
        </div>
        <div>
          <OverdueBooks />
          <MostBorrowedBooks />
        </div>
      </DefaultLayout>
    </div>
  );
};
export default DashboardPage;
