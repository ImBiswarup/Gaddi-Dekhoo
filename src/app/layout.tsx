import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/app/context/AppContext";
import Navbar from "./components/Navbar";
import SessionWrapper from "@/app/components/SessionWrapper";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const mono = Roboto_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gaddi Dekhooo",
  description: "This is a fullstack application to get or lend you a car in a pocket-friendly budget.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${mono.variable} antialiased`}>
        <SessionWrapper>
          <AppProvider>
            <Navbar />
            {children}
          </AppProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
