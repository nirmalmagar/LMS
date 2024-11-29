"use client";
import { ReactNode, Suspense, useEffect } from "react";
import { routes } from "@/utils/routes";
import Cookies from "js-cookie";
import { ColorTheme } from "@/context/ColorTheme";
import { usePathname, useRouter } from "next/navigation";

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
  }, [router, token, pathname]);

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
