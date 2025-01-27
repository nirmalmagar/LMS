"use client";
import React from "react";
import Link from "next/link";
import routes from "@/utils/userRoutes";
import { usePathname } from "next/navigation";
import {
  ChevronDownIcon,
  Cog6ToothIcon,
  HomeIcon,
  CreditCardIcon,
  BellIcon,
  ShieldCheckIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";

const UserSidebar = () => {
  // const [navbarText, setNavbarText] = useState<boolean>(false);
  const pathname = usePathname();

  const navigation = [
    { name: "Dashboard", href: routes.USER_DASHBOARD_ROUTE, icon: HomeIcon },
    {
      name: "Borrow History",
      href: routes.BORROW_HISTORY,
      icon: CreditCardIcon,
    },
    {
      name: "Notification",
      href: routes.NOTIFICATION,
      icon: BellIcon,
    },
    {
      name: "Settting",
      href: routes.SETTING,
      icon: Cog6ToothIcon,
      children: [
        {
          name: "Update Profile",
          href: routes.UPDATE_PROFILE,
          icon: UserIcon,
        },
        {
          name: "Change Password",
          href: routes.CHANGE_PASSWORD,
          icon: ShieldCheckIcon,
        },
      ],
    },
  ];

  return (
    <aside className="bg-white text-black px-2" id="">
      <div className="list-none flex flex-col  text-lg gap-4 gap-y-4 mt-12">
        <ul>
          <li className="mt-4 flex flex-col gap-2">
            {navigation.map((navbarList, index: number) => {
              return (
                <React.Fragment key={index}>
                  {!navbarList?.children?.length ? (
                    <Link
                      href={navbarList?.href}
                      className={`flex gap-2 ${
                        navbarList?.href === pathname
                          ? "bg-red-400 text-white rounded-xl"
                          : ""
                      } hover:bg-red-400 hover:rounded-xl hover:text-white text-base items-center px-4 py-2`}
                    >
                      <navbarList.icon className="h-5 w-5 shrink-0" />
                      <span className="text-sm">{navbarList.name}</span>
                    </Link>
                  ) : (
                    <Disclosure>
                      <DisclosureButton>
                        <div className="flex">
                          <div
                            className={`flex gap-2 ${
                              navbarList?.href === pathname &&
                              navbarList?.children.length > 0
                                ? "bg-red-400 text-white rounded-xl"
                                : ""
                            } hover:bg-red-400 hover:rounded-xl hover:text-white text-base items-center px-4 py-2`}
                          >
                            <navbarList.icon className="h-5 w-5 shrink-0" />
                            <span className="text-sm">{navbarList.name}</span>
                            <ChevronDownIcon className="w-3 h-3 float-right" />
                          </div>
                        </div>
                      </DisclosureButton>
                      <DisclosurePanel className="text-gray-600 ml-4 flex flex-col gap-2">
                        {navbarList?.children.map((items, childIndex) => {
                          return (
                            <Link
                              key={childIndex}
                              href={items?.href}
                              className={`flex gap-2 ${
                                items?.href === pathname
                                  ? "bg-red-400 text-white rounded-xl"
                                  : ""
                              } hover:bg-red-400 hover:rounded-xl hover:text-white text-base items-center px-4 py-2`}
                            >
                              <items.icon className="h-5 w-5 shrink-0" />
                              <span className="text-sm">{items.name}</span>
                            </Link>
                          );
                        })}
                      </DisclosurePanel>
                    </Disclosure>
                  )}
                </React.Fragment>
              );
            })}
          </li>
        </ul>
      </div>
    </aside>
  );
};
export default UserSidebar;
