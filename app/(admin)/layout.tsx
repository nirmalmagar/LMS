"use client";
import { ReactNode, Suspense, useEffect } from "react";
import { routes } from "@/utils/routes";
import Cookies from "js-cookie";
import { AppColorThemeProvider } from "@/context/ColorTheme";
import { useRouter } from "next/navigation";
import {AuthProvider} from "@/context/AuthContext";

const AdminRootLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const token = Cookies.get("LOGIN_TOKEN");

  useEffect(() => {
    if (token) {
      router.push(routes.ADMIN_DASHBOARD_ROUTE);
    } else {
      router.push(routes.ADMIN_AUTH_LOGIN);
    }
  }, [router, token]);

  return (
        <Suspense>
          <AuthProvider>
            {/* <ColorTheme>{children}</ColorTheme> */}
            <AppColorThemeProvider>{children}</AppColorThemeProvider>
          </AuthProvider>
        </Suspense>
  );
};
export default AdminRootLayout;
