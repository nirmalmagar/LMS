"use client"
import React from "react";
import DefaultLayout from "@/components/Layouts/UserNavbar/DefaultLayout";
import DashboardCard from "@/components/Elements/Dashboard/DashboardCard";
import { HiOutlineUsers } from "react-icons/hi2";
import { FaPeopleGroup } from "react-icons/fa6";
import { CgCalendarDue } from "react-icons/cg";
import { MdPendingActions } from "react-icons/md";
import useSWR from "swr";
import { defaultFetcher } from "@/helpers/FetchHelper";
import WelcomeBanner from "./_partials/WelcomeBanner";
const page = () => {
  const { data } = useSWR(
    `${process.env.HOST}dashboard/student/`,
    defaultFetcher
  );
  return (
    <div>
      <DefaultLayout>
      <WelcomeBanner />
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-8 mt-14">
          <DashboardCard
            totalList={data?.total_books_borrowed ?? 0}
            title={"Total Book Borrow"}
          >
            {
              <HiOutlineUsers className="w-10 h-10 p-2 rounded-full bg-red-400" />
            }
          </DashboardCard>
          <DashboardCard totalList={data?.overdue_books ?? 0} title={"Overdue Books"}>
            {
              <FaPeopleGroup className="w-10 h-10 p-2 rounded-full bg-red-400" />
            }
          </DashboardCard>
          <DashboardCard
            totalList={data?.pending_book_returns ?? 0}
            title={"Pending Books"}
          >
            {
              <CgCalendarDue className="w-10 h-10 p-2 rounded-full bg-red-400" />
            }
          </DashboardCard>
          <DashboardCard
            totalList={data?.total_fine_paid ?? 0}
            title={"total fine paid"}
          >
            {
              <MdPendingActions className="w-10 h-10 p-2 rounded-full bg-red-400" />
            }
          </DashboardCard>
        </div>
      </DefaultLayout>
    </div>
  );
};
export default page;
