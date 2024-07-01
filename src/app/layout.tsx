import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/store/ReduxProvider";
import { UserProvider } from "@/context/user";

const montserrat = Montserrat({ subsets: ["cyrillic"] });

export const metadata: Metadata = {
  title: "SkyPro music",
  description: "Музыка на любой вкус, только в SkyPro",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <UserProvider>
      <ReduxProvider>
      <body className={montserrat.className}>{children}</body>
      </ReduxProvider>
      </UserProvider>
    </html>
  );
}
