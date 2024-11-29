import React, { useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { routes } from "@/utils/routes";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { RiLogoutBoxRLine } from "react-icons/ri";

const DropdownAdmin = () => {
  const [dropdownMenu, setDropdownMenu] = useState<boolean>(false);
  const logout = () => {
    Cookies.remove("LOGIN_TOKEN");
  };
  return (
    <>
      <div className="text-right text-sm">
        <div
          className="flex items-center gap-x-8 cursor-pointer"
          onClick={() => setDropdownMenu(!dropdownMenu)}
        >
          <div>
            <h1>administrator@gmail.com</h1>
            <span>( admin )</span>
          </div>
          <div>{dropdownMenu ? <IoIosArrowUp /> : <IoIosArrowDown />}</div>
        </div>
        {dropdownMenu && (
          <div className="absolute top-14 right-9 rounded-b-lg bg-white w-60 p-4 pr-14">
            <ul>
              {/* <li className="text-md">
              <Link href={""}>admin</Link>
            </li> */}
              <li className="text-md">
                <div className="flex items-center gap-8 float-right">
                  <RiLogoutBoxRLine />
                  <Link href={routes.ADMIN_AUTH_LOGIN} onClick={logout}>
                    LogOut
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default DropdownAdmin;
