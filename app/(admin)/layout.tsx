"use client"
import { ReactNode, Suspense,useEffect } from "react";
import { routes } from "@/utils/routes";
import Cookies from "js-cookie";
import { ColorTheme } from "@/context/ColorTheme";
import { useRouter } from "next/navigation";

const AdminRootLayout = ({ children }: { children: ReactNode }) => {
  const route = useRouter();
  const token = Cookies.get("LOGIN_TOKEN")
  useEffect(() => {
    if (token) {
      route.push(routes.ADMIN_DASHBOARD_ROUTE);
    }
    else{
      route.push(routes.ADMIN_AUTH_LOGIN)
    }
  }, [route,token]);

  return (
    <html lang="en">
      <body className="" suppressHydrationWarning>
        <Suspense>
          <ColorTheme>{children}</ColorTheme>
        </Suspense>
      </body>
    </html>
  );
};
export default AdminRootLayout;
