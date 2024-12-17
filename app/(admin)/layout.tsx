"use client";
import { ReactNode, Suspense, useEffect } from "react";
import { routes } from "@/utils/routes";
import Cookies from "js-cookie";
// import { ColorTheme } from "@/context/ColorTheme";
import { AppColorThemeProvider } from "@/context/ColorTheme";
import { usePathname, useRouter } from "next/navigation";
import {AuthProvider} from "@/context/AuthContext";

const AdminRootLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const token = Cookies.get("LOGIN_TOKEN");
  const pathname = usePathname();

  useEffect(() => {
    if (token) {
      router.push(routes.ADMIN_DASHBOARD_ROUTE);
    } else {
      router.push(routes.ADMIN_AUTH_LOGIN);
    }
  }, [router, token]);

  return (
    <html lang="en">
      <body className="" suppressHydrationWarning>
        <Suspense>
          <AuthProvider>
            {/* <ColorTheme>{children}</ColorTheme> */}
            <AppColorThemeProvider>{children}</AppColorThemeProvider>
          </AuthProvider>
        </Suspense>
      </body>
    </html>
  );
};
export default AdminRootLayout;
