"use client";
import "../styles/global.css";
import "../styles/reset.css";
import { Inter } from "next/font/google";
import Header from "../components/header";
import "regenerator-runtime/runtime";
import { AnswersProvider } from "@/context";
import { MessagesProvider } from "@/utils/useMessages";
import { ToastProvider } from '@apideck/components'

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-white">
      <body className={inter.className + " h-full vsc-initialized"}>
        <ToastProvider>
        <MessagesProvider>
          <AnswersProvider>
            <main className="font-mono">
              <Header />
              {children}
            </main>
          </AnswersProvider>
        </MessagesProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
