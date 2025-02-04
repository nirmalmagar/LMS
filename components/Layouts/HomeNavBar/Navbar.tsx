import Container from "@/components/Container";
import routes from "@/utils/userRoutes";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";
import Image from "next/image";

const Navbar = () => {
  const router = usePathname();
  const [isStickyNavbar, setIsStickyNavbar] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const ListenScroll = () => {
    if (window.scrollY >= 150) {
      setIsStickyNavbar(true);
    } else {
      setIsStickyNavbar(false);
    }
  };

  const logout = () => {
    Cookies.remove("LOGIN_TOKEN");
    Cookies.remove("USER_ID");
    window.location.reload()
  };

  useEffect(() => {
    const token = Cookies.get("LOGIN_TOKEN"); // Fetch token on the client
    const user_id = Cookies.get("USER_ID");
    if (token && user_id) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", ListenScroll);
    return () => window.removeEventListener("scroll", ListenScroll);
  }, [isStickyNavbar]);
  return (
    <>
      <div
        className={`sticky top-0 z-40 w-full 
        ${
          router === "/"
            ? isStickyNavbar
              ? "bg-stone-500 text-white py-4"
              : "hidden"
            : "bg-stone-500 text-white py-4 mb-20"
        }`}
      >
        <Container>
          <ul className="flex gap-x-16 text-[16px] justify-center cursor-pointer font-sans font-medium tracking-wider items-center text-center">
            {/* <li className="z-20">
              <Image
                width={80}
                height={80}
                src={"/assets/logo.png"}
                alt="logo"
                sizes="fit"
              />
            </li> */}
            <li className="hover:text-orange-600">
              <Link href={"/"}>Home</Link>
            </li>
            <li className="hover:text-orange-600">About</li>
            <li className="hover:text-orange-600">Catalog</li>
            <li className="hover:text-orange-600">Services</li>
            <li className="hover:text-orange-600">Contacts</li>
            {isLoggedIn ? (
              <button onClick={logout} className="hover:bg-blue-800 bg-blue-500 px-4 py-1 rounded-md">
                Logout
              </button>
            ) : (
              <>
                <Link href={routes.USER_AUTH_LOGIN} className="hover:bg-blue-800 bg-blue-500 px-4 py-1 rounded-md">
                Login
              </Link>
              <Link href={routes.USER_AUTH_SIGN_UP} className="hover:bg-blue-800 bg-blue-500 px-4 py-1 rounded-md">
                Sigup
              </Link>
              </>
            )}
          </ul>
        </Container>
      </div>
    </>
  );
};

export default Navbar;
