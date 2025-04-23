import type { Metadata } from "next";
import "@/app/globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import { AuthProvider } from "@/lib/auth";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Marquee } from "@/components/marquee";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Faculty Dashboard",
  description: "A comprehensive dashboard for faculty management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <AuthProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <Marquee />
              <ScrollArea className="flex-1 custom-scrollbar">
                <main className="flex-1">{children}</main>
              </ScrollArea>
              <Toaster />
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

import './globals.css'