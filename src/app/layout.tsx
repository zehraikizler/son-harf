"use client";
import "../styles/global.css";
import "../styles/reset.css";
import { Inter } from "next/font/google";
import Header from "@/components/header";
import Footer from "@/components/footer";
import "regenerator-runtime/runtime";
import { GameProvider } from "@/utils/useGame";
import { ToastProvider } from "@apideck/components";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="tr"
      className="h-full bg-gradient-to-l from-indigo-50 via-purple-50 to-pink-50"
    ><head>
      <title>Son Harf</title>
      <link rel="shortcut icon" href="https://as2.ftcdn.net/v2/jpg/01/85/13/47/1000_F_185134767_3zI4z0vWkI6ZBzCgbVC6tG93OidfDqO7.jpg" type="image/x-icon" />
    </head>
      <body className={inter.className + " h-full vsc-initialized"}>
        <ToastProvider>
          <GameProvider>
            <main className="font-mono flex flex-col h-screen">
              <Header />
              <div className="h-full">{children}</div>
              <Footer />
            </main>
          </GameProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
