"use client";
import { useEffect, useRef } from "react";
import routes from "@/utils/userRoutes";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const UserDashBoard:React.FC = () => {
  const router = useRouter();
  const token = Cookies.get("LOGIN_TOKEN");
  
  const isMounted = useRef(false)
  useEffect(() => {
    if(!isMounted.current){
        isMounted.current = true
        router.push(
          token 
            ? routes.USER_DASHBOARD_ROUTE
            : routes.USER_AUTH_LOGIN 
        );
    }
}, [router, token]);

  return (
    <></>
  );
};
export default UserDashBoard;
