"use client";
import { ReactNode, Suspense, useEffect } from "react";
import routes from "@/utils/studentRoutes";
import Cookies from "js-cookie";
import { AppColorThemeProvider } from "@/context/ColorTheme";
import { useRouter } from "next/navigation";
import { AuthProvider } from "@/context/AuthContext";

const AdminRootLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const token = Cookies.get("STUDENT_LOGIN_TOKEN");

  useEffect(() => {
    if (token) {
      router.push(routes.STUDENT_DASHBOARD_ROUTE);
    } else {
      router.push(routes.STUDENT_AUTH_LOGIN);
    }
  }, [router, token]);

  return (
    <Suspense>
      {/* <AuthProvider> */}
        {/* <ColorTheme>{children}</ColorTheme> */}
        <AppColorThemeProvider>{children}</AppColorThemeProvider>
      {/* </AuthProvider> */}
    </Suspense>
  );
};
export default AdminRootLayout;
