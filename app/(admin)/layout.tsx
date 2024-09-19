import { ReactNode, Suspense } from "react";
import { ColorTheme } from "@/context/ColorTheme";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <Suspense>
          <ColorTheme>{children}</ColorTheme>
        </Suspense>
      </body>
    </html>
  );
};
export default RootLayout;
