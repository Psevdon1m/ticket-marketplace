import { Geist, Geist_Mono } from "next/font/google";
import { UserProvider } from "./context/UserContext";
import Header from "@/components/Header";
import { apiFetch } from "@/utils/apiFetch";
import "./globals.css";
import React from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Ticket Marketplace",
  description: "A modern ticket marketplace built with microservices",
};

export default async function RootLayout({ children }) {
  const res = await apiFetch("auth", "/api/users/currentuser");
  const { currentUser } = res;

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UserProvider state={currentUser}>
          <Header user={currentUser} />
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
