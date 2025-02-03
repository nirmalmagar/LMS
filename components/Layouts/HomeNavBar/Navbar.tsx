import Container from "@/components/Container";
import routes from "@/utils/userRoutes";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const router = usePathname();
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
      <div
        className={`sticky top-0 z-40 w-full 
        ${router === "/" ? isStickyNavbar ? "bg-stone-500 text-white py-4" : "hidden" 
        : "bg-stone-500 text-white py-4 mb-20"}`}
      >
        <Container>
          <ul className="flex gap-x-16 text-[16px] justify-center cursor-pointer font-sans font-medium tracking-wider items-center text-center">
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
