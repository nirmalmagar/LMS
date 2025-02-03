import Container from "@/components/Container";
import routes from "@/utils/userRoutes";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const router = usePathname();
  console.log("router", router);
    const [isStickyNavbar, setIsStickyNavbar] = useState(false);
  
    const ListenScroll = () => {
      if (window.scrollY >= 150) {
        setIsStickyNavbar(true);
      } else {
        setIsStickyNavbar(false);
      }
    };
  
    useEffect(() => {
      window.addEventListener("scroll", ListenScroll);
  
      return () => window.removeEventListener("scroll", ListenScroll);
    }, [isStickyNavbar]);
  return (
    <>
    <div className={isStickyNavbar ? `bg-stone-500 text-white sticky py-4 top-0 z-40 w-full` : "hidden" }>
      {/* <div className={`bg-stone-500 text-white sticky py-4 top-0 mb-20 z-40 w-full`}> */}
      <Container>
        <ul className="flex gap-x-16 text-[16px] justify-center cursor-pointer font-sans font-medium tracking-wider items-center text-center">
          {/* <div className="relative w-14 h-14">
            <Image fill src={"/assets/logo.png"} alt="LMS logo" sizes="fit" />
          </div> */}
          <li className="hover:text-orange-600">
            <Link href={"/"}>Home</Link>
          </li>
          <li className="hover:text-orange-600">About</li>
          <li className="hover:text-orange-600">Catalog</li>
          <li className="hover:text-orange-600">Services</li>
          <li className="hover:text-orange-600">Contacts</li>
          <li className="hover:text-orange-600">
            <Link href={routes.USER_AUTH_LOGIN}>Login</Link>
          </li>
        </ul>
      </Container>
    </div>
    </>
  );
};

export default Navbar;
