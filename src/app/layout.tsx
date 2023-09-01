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
      lang="en"
      className="h-full bg-gradient-to-l from-indigo-50 via-purple-50 to-pink-50"
    >
      <body className={inter.className + " h-full vsc-initialized"}>
        <ToastProvider>
          <GameProvider>
            <main className="font-mono flex flex-col">
              <Header />
              {children}
              <Footer />
            </main>
          </GameProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
