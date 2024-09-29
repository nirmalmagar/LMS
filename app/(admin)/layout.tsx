"use client"
import { ReactNode, Suspense } from "react";
import { ColorTheme } from "@/context/ColorTheme";

const AdminRootLayout = ({ children }: { children: ReactNode }) => {
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
