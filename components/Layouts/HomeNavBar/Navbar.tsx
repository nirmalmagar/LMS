import Container from "@/components/Container";
import { routes } from "@/utils/routes";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="bg-gray-100 fixed top-0 z-40 w-full">
      <Container>
        <nav className=" items-center flex justify-between">
          <div className="relative w-14 h-14">
            <Image fill src={"/assets/logo.png"} alt="LMS logo" sizes="fit"/>
          </div>
          <ul className="flex gap-x-20 font-semibold text-[17px] cursor-pointer">
            <li className="hover:text-blue-800">
              <Link href={"/"}>Home</Link>
            </li>
            <li className="hover:text-blue-800">
              <Link href={routes.ADMIN_AUTH_LOGIN}>Login</Link>
            </li>
            <li className="hover:text-blue-800">Membership</li>
            <li className="hover:text-blue-800">NPR</li>
            <li className="hover:text-blue-800">
              <Link href={routes.ADMIN_AUTH_SIGN_UP}>Create Account</Link>
            </li>
            {/* <li className="hover:text-blue-800">
              <ShoppingBagIcon className="w-6 h-6" />
            </li> */}
          </ul>
        </nav>
      </Container>
    </div>
  );
};

export default Navbar;
