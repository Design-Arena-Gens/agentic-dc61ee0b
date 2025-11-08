import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

export const metadata: Metadata = {
  title: "Bharat Life Care Social AI",
  description:
    "Autonomous social media manager for Bharat Life Care that orchestrates end-to-end workflows."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans bg-slate-50`}>
        {children}
      </body>
    </html>
  );
}
