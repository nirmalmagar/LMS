import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { routes } from "@/utils/routes";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { defaultFetcher } from "@/helpers/FetchHelper";

const DropdownAdmin = () => {
  const [dropdownMenu, setDropdownMenu] = useState<boolean>(false);
  const closeDropdownRef: any = useRef();
  const router = useRouter();

  const GROUP_NAME = Cookies.get("GROUP_NAME");
  const ADMIN_LOGIN_ID = Cookies.get("ADMIN_LOGIN_ID");
  const userURL = `${process.env.HOST}user/${ADMIN_LOGIN_ID}`;
  const { data: userList, isLoading, mutate } = useSWR(userURL, defaultFetcher);

  const logout = () => {
    Cookies.remove("LOGIN_TOKEN");
    Cookies.remove("GROUP_NAME");
    Cookies.remove("ADMIN_LOGIN_ID");
    router.replace(routes.ADMIN_AUTH_LOGIN);
  };
  useEffect(() => {
    let changeHandler = (e: any) => {
      if (!closeDropdownRef.current.contains(e.target)) {
        setDropdownMenu(false);
      }
    };
    document.addEventListener("mousedown", changeHandler);
    return () => {
      document.removeEventListener("mousedown", changeHandler);
    };
  }, []);
  return (
    <>
      <div ref={closeDropdownRef} className="text-right text-sm">
        <div
          className="flex items-center gap-x-8 cursor-pointer"
          onClick={() => setDropdownMenu(!dropdownMenu)}
        >
          <div>
            <h1>{userList?.email}</h1>
            <span>( {GROUP_NAME} )</span>
          </div>
          <div>{dropdownMenu ? <IoIosArrowUp /> : <IoIosArrowDown />}</div>
        </div>
        {dropdownMenu && (
          <div
            onClick={logout}
            className="absolute top-14 cursor-pointer right-9 rounded-b-lg bg-white w-60 p-4 pr-14"
          >
            <ul>
              {/* <li className="text-md">
              <Link href={""}>admin</Link>
            </li> */}
              <li className="text-md">
                <div className="flex items-center gap-8 float-right">
                  <RiLogoutBoxRLine />
                  <span>LogOut</span>
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
