"use client";
import { ReactNode, Suspense, useEffect, useRef, useState } from "react";
import { routes } from "@/utils/routes";
import Cookies from "js-cookie";
import { AppColorThemeProvider } from "@/context/ColorTheme";
import { useRouter } from "next/navigation";
import { AuthProvider } from "@/context/AuthContext";
import Loader from "@/components/common/Loader";

const AdminRootLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const token = Cookies.get("LOGIN_TOKEN");

  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const isMounted = useRef(false)
  useEffect(() => {
      if(!isMounted.current){
          isMounted.current = true
          router.push(token ? routes.ADMIN_DASHBOARD_ROUTE : routes.ADMIN_AUTH_LOGIN );
      }
  }, [router , token]);

  return (
    <Suspense>
      <AuthProvider>
        {/* <ColorTheme>{children}</ColorTheme> */}
        <AppColorThemeProvider> <div className="dark:bg-boxdark-2 dark:text-bodydark">
          {loading ? <Loader /> : children}
        </div></AppColorThemeProvider>
      </AuthProvider>
    </Suspense>
  );
};
export default AdminRootLayout;
