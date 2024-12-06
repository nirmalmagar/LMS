"use client";
import React, { useState } from "react";
import Link from "next/link";
import { routes } from "@/utils/routes";
import { IoMenuSharp } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { usePathname } from "next/navigation";
import {
  Cog6ToothIcon,
  HomeIcon,
  ChatBubbleLeftEllipsisIcon,
  BookOpenIcon,
  QuestionMarkCircleIcon,
  RectangleGroupIcon,
  UsersIcon,
  UserIcon,
  CreditCardIcon,
  AcademicCapIcon,
  PresentationChartLineIcon,
  UserCircleIcon,
  UserGroupIcon,
  BuildingLibraryIcon,
  BuildingOffice2Icon,
} from "@heroicons/react/24/outline";

const AdminSidebar = () => {
  const [navbarText, setNavbarText] = useState<boolean>(false);
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
      name: "Reserve",
      href: routes.ADMIN_RESERVE_QUEUE_ROUTE,
      icon: RectangleGroupIcon,
    },
    {
      name: "Digital Resources",
      href: routes.DIGITAL_RESOURCE_LISTS,
      icon: PresentationChartLineIcon,
    },
    {
      name: "Academics",
      href: routes.ADMIN_RESERVE_QUEUE_ROUTE,
      icon: AcademicCapIcon,
    },
    // {
    //   name: "grade",
    //   href: routes.ADMIN_RESERVE_QUEUE_ROUTE,
    //   icon: BookOpenIcon,
    // },
    // {
    //   name: "Teachers",
    //   href: routes.ADMIN_RESERVE_QUEUE_ROUTE,
    //   icon: UserCircleIcon,
    // },
    // {
    //   name: "Staff",
    //   href: routes.ADMIN_RESERVE_QUEUE_ROUTE,
    //   icon: UserGroupIcon,
    // },
    // {
    //   name: "Department",
    //   href: routes.ADMIN_RESERVE_QUEUE_ROUTE,
    //   icon: BuildingLibraryIcon,
    // },
    // {
    //   name: "Students",
    //   href: routes.ADMIN_RESERVE_QUEUE_ROUTE,
    //   icon: UserIcon,
    // },
    // {
    //   name: "Library",
    //   href: routes.ADMIN_RESERVE_QUEUE_ROUTE,
    //   icon: BuildingOffice2Icon,
    // },
    // {
    //   name: "Shelf",
    //   href: routes.ADMIN_RESERVE_QUEUE_ROUTE,
    //   icon: UserCircleIcon,
    // },
    {
      name: "Fine",
      href: routes.ADMIN_RESERVE_QUEUE_ROUTE,
      icon: CreditCardIcon,
    },
    {
      name: "Settting",
      href: routes.ADMIN_RESERVES_ROUTE,
      icon: Cog6ToothIcon,
    },
  ];

  return (
    <aside className="bg-white text-black px-2" id="">
      <Link
        href={routes.ADMIN_DASHBOARD_ROUTE}
        className="flex justify-center pt-4"
      >
        {/* <Image
          height={80}
          width={80}
          src={"/assets/logo.png"}
          alt="LMS logo"
        /> */}
      </Link>
      <div className="list-none flex flex-col  text-lg gap-4 gap-y-4 mt-12">
        <button className="ml-4" onClick={() => setNavbarText(!navbarText)}>
          {navbarText ? (
            <RxCross2 className="h-5 w-5 shrink-0" />
          ) : (
            <IoMenuSharp className="h-5 w-5 shrink-0" />
          )}
        </button>
        {/* <span className="text-xs text-blue-200 font-semibold px-4">BOOKS</span> */}
        <ul>
          <li className="mt-4 flex flex-col gap-2">
            {navigation.map((navbarList, index: number) => {
              return (
                <div key={index}>
                  <Link
                    href={navbarList?.href}
                    className={`flex gap-2 ${
                      navbarList?.href === pathname
                        ? "bg-red-400 text-white rounded-xl"
                        : ""
                    } hover:bg-red-400 hover:rounded-xl hover:text-white text-base items-center px-4 py-2`}
                  >
                    <navbarList.icon className="h-5 w-5 shrink-0" />
                    {navbarText && (
                      <span className="text-sm">{navbarList.name}</span>
                    )}
                  </Link>
                </div>
              );
            })}
          </li>
        </ul>
      </div>
    </aside>
  );
};
export default AdminSidebar;
