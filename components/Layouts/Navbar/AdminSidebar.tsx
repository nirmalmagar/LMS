"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { routes } from "@/utils/routes";
import { useParams } from "next/navigation";
import { usePathname } from "next/navigation";
import {
  Cog6ToothIcon,
  HomeIcon,
  ChatBubbleLeftEllipsisIcon,
  BookOpenIcon,
  QuestionMarkCircleIcon,
  RectangleGroupIcon,
  UsersIcon
} from "@heroicons/react/24/outline";

const AdminSidebar = () => {
  const pathname = usePathname();

  const navigation = [
    { name: "Dashboard", href: routes.ADMIN_DASHBOARD_ROUTE, icon: HomeIcon },
    {
      name: "user",
      href: routes.ADMIN_USERS_ROUTE,
      icon: UsersIcon,
    },
    { name: "Books", href: routes.ADMIN_BOOKS_ROUTE, icon: BookOpenIcon },
    {
      name: "Borrow",
      href: routes.ADMIN_BORROW_ROUTE,
      icon: ChatBubbleLeftEllipsisIcon,
    },
    {
      name: "Genres",
      href: routes.ADMIN_GENRES_ROUTE,
      icon: QuestionMarkCircleIcon,
    },
    {
      name: "Reserve Queue",
      href: routes.ADMIN_RESERVE_QUEUE_ROUTE,
      icon: RectangleGroupIcon,
    },
    {
      name: "Reserves",
      href: routes.ADMIN_RESERVES_ROUTE,
      icon: Cog6ToothIcon,
    },
  ];

  return (
    <aside className="bg-gray-800 w-[14rem] text-blue-100 px-4">
      <Link
        href={routes.ADMIN_DASHBOARD_ROUTE}
        className="flex justify-center pt-4"
      >
        <Image
          height={100}
          width={100}
          src={"/assets/logo.png"}
          alt="LMS logo"
        />
      </Link>
      <div className="list-none flex flex-col text-lg gap-y-4 mt-12">
        <span className="text-xs text-blue-200 font-semibold px-4">BOOKS</span>
        <ul>
          <li>
            {navigation.map((navbarList) => {
              return (
                <Link
                  href={navbarList?.href}
                  className={`flex gap-2 ${
                    navbarList?.href === pathname ? "bg-slate-700" : ""
                  } hover:bg-slate-700 text-base items-center px-4 py-2`}
                >
                  <navbarList.icon className="h-5 w-5 shrink-0 text-gray-400" />
                  <span>{navbarList.name}</span>
                </Link>
              );
            })}
          </li>
        </ul>
      </div>
    </aside>
  );
};
export default AdminSidebar;
