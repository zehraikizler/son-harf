"use client";
import "../styles/global.css";
import "../styles/reset.css";
import { Inter } from "next/font/google";
import Header from "../components/header";
import "regenerator-runtime/runtime";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-gray-100">
      <body className={inter.className + " h-full vsc-initialized"}>
        <main>
          <Header />
          {children}
        </main>
      </body>
    </html>
  );
}
