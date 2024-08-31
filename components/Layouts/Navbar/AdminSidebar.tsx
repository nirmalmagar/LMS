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
        <Link href={"/"} className="flex justify-center pt-4">
          <Image
            height={100}
            width={100}
            src={"/assets/logo.png"}
            alt="LMS logo"
          />
        </Link>
        <div className="list-none flex flex-col text-lg gap-y-6 mt-12">
          <span className="text-sm text-blue-200 font-semibold px-4">MENU</span>
          <Link
            href={routes.ADMIN_DASHBOARD_ROUTE}
            className="flex gap-2 hover:bg-slate-700 px-4 py-2"
          >
            <HomeIcon className="w-6 h-6" />
            <span>Dashboard</span>
          </Link>
          <Link href={"/"} className="flex gap-2 hover:bg-slate-700 px-4 py-2">
            <ChatBubbleLeftEllipsisIcon className="w-6 h-6" />
            <span>Contact us</span>
          </Link>
          <Link
            href={routes.ADMIN_BOOKS_ROUTE}
            className="flex gap-2 hover:bg-slate-700 px-4 py-2"
          >
            <BookOpenIcon className="w-6 h-6" />
            <span>Books</span>
          </Link>
          <Link href={"/"} className="flex gap-2 hover:bg-slate-700 px-4 py-2">
            <QuestionMarkCircleIcon className="w-6 h-6" />
            <span>FAQs</span>
          </Link>
          <Link href={"/"} className="flex gap-2 hover:bg-slate-700 px-4 py-2">
            <RectangleGroupIcon className="w-6 h-6" />
            <span>Testomonial</span>
          </Link>
          <Link href={"/"} className="flex gap-2 hover:bg-slate-700 px-4 py-2">
            <Cog6ToothIcon className="w-6 h-6" />
            <span>Setting</span>
          </Link>
        </div>
      </aside>
    </>
  );
};
export default AdminSidebar;
