"use client";
import { ReactNode, Suspense } from "react";
import { AppColorThemeProvider } from "@/context/ColorTheme";

const AdminRootLayout = ({ children }: { children: ReactNode }) => {
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
