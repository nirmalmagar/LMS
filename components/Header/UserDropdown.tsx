import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import routes from "@/utils/userRoutes";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { defaultFetcher } from "@/helpers/FetchHelper";

const UserDropdown = () => {
  const [dropdownMenu, setDropdownMenu] = useState<boolean>(false);
  const closeDropdownRef: any = useRef();
  const router = useRouter();

  const user_id = Cookies.get("USER_ID");
  const userURL = `${process.env.HOST}user/${user_id}`;
  const { data: userList, isLoading, mutate } = useSWR(userURL, defaultFetcher);

  const logout = () => {
    Cookies.remove("LOGIN_TOKEN");
    router.replace(routes.USER_AUTH_LOGIN);
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
            {isLoading ? (
              <div className="text-sm">loading....</div>
            ) : (
              <>
                <h1>{userList?.email}</h1>
                <span>( user )</span>
              </>
            )}
          </div>
          <div>{dropdownMenu ? <IoIosArrowUp /> : <IoIosArrowDown />}</div>
        </div>
        {dropdownMenu && (
          <div onClick={logout} className="absolute top-14 right-9 rounded-b-lg cursor-pointer bg-white w-60 p-4 pr-14">
            <ul>
              {/* <li className="text-md">
              <Link href={""}>admin</Link>
            </li> */}
              <li className="text-md cursor-pointer">
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

export default UserDropdown;
