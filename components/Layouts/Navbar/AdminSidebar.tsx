import React from "react";
import Image from "next/image";
import Link from "next/link";
import { routes } from "@/utils/routes";
import {
  Cog6ToothIcon,
  HomeIcon,
  ChatBubbleLeftEllipsisIcon,
  BookOpenIcon,
  QuestionMarkCircleIcon,
  RectangleGroupIcon,
} from "@heroicons/react/24/outline";

const AdminSidebar = () => {
  return (
    <>
      <aside className="bg-gray-800 h-screen w-[14rem] text-blue-100 px-4">
        <Link href={routes.ADMIN_DASHBOARD_ROUTE} className="flex justify-center pt-4">
          <Image
            height={100}
            width={100}
            src={"/assets/logo.png"}
            alt="LMS logo"
          />
        </Link>
        <div className="list-none flex flex-col text-lg gap-y-4 mt-12">
          <span className="text-xs text-blue-200 font-semibold px-4">BOOKS</span>
          <Link
            href={routes.ADMIN_DASHBOARD_ROUTE}
            className="flex gap-2 hover:bg-slate-700 text-base items-center px-4 py-2"
          >
            <HomeIcon className="w-5 h-5" />
            <span>Dashboard</span>
          </Link>
         
          <Link
            href={routes.ADMIN_BOOKS_ROUTE}
            className="flex gap-2 hover:bg-slate-700 text-base items-center px-4 py-2"
          >
            <BookOpenIcon className="w-5 h-5" />
            <span>Books</span>
          </Link>
          <Link href={routes.ADMIN_BORROW_ROUTE} className="flex gap-2 hover:bg-slate-700 text-base items-center px-4 py-2">
            <ChatBubbleLeftEllipsisIcon className="w-5 h-5" />
            <span>Borrow</span>
          </Link>
          <Link href={routes.ADMIN_GENRES_ROUTE} className="flex gap-2 hover:bg-slate-700 text-base items-center px-4 py-2">
            <QuestionMarkCircleIcon className="w-5 h-5" />
            <span>Genres</span>
          </Link>
          <Link href={routes.ADMIN_RESERVE_QUEUE_ROUTE} className="flex gap-2 hover:bg-slate-700 text-base items-center px-4 py-2">
            <RectangleGroupIcon className="w-5 h-5" />
            <span>Reserve Queue </span>
          </Link>
          <Link href={routes.ADMIN_RESERVES_ROUTE} className="flex gap-2 hover:bg-slate-700 text-base items-center px-4 py-2">
            <Cog6ToothIcon className="w-5 h-5" />
            <span>Reserves</span>
          </Link>
        </div>
      </aside>
    </>
  );
};
export default AdminSidebar;
