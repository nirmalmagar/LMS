"use client";
import React from "react";
import Link from "next/link";
import routes from "@/utils/studentRoutes";
import { usePathname } from "next/navigation";
import {
  Cog6ToothIcon,
  HomeIcon,
  CreditCardIcon,
} from "@heroicons/react/24/outline";

const AdminSidebar = () => {
  const pathname = usePathname();

  const navigation = [
    { name: "Dashboard", href: routes.STUDENT_DASHBOARD_ROUTE, icon: HomeIcon },
    {
      name: "Borrow History",
      href: routes.BORROW_HISTORY,
      icon: CreditCardIcon,
    },
    {
      name: "Notification",
      href: routes.NOTIFICATION,
      icon: CreditCardIcon,
    },
    {
      name: "Settting",
      href: routes.SETTING,
      icon: Cog6ToothIcon,
    },
  ];

  return (
    <aside className="bg-white text-black px-2" id="">
      <div className="list-none flex flex-col  text-lg gap-4 gap-y-4 mt-12">
          <li className="mt-4 flex flex-col gap-2">
            {navigation.map((navbarList, index: number) => {
              return (
                <Link href={navbarList?.href}
                  key={index}
                  className={`flex gap-2 cursor-pointer ${
                    navbarList?.href === pathname
                      ? "bg-red-400 text-white rounded-xl"
                      : ""
                  } hover:bg-red-400 hover:rounded-xl hover:text-white text-base items-center px-4 py-2`}
                >
                  <navbarList.icon className="h-5 w-5 shrink-0" />
                  <span className="text-sm">{navbarList.name}</span>
                </Link>
              );
            })}
          </li>
      </div>
    </aside>
  );
};
export default AdminSidebar;