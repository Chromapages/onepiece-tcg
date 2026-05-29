import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "One Piece TCG Database",
  description: "Browse and explore the complete One Piece Trading Card Game catalog. Filter by color, type, character, and more.",
  keywords: ["One Piece TCG", "One Piece card game", "TCG", "trading cards", "Romance Dawn", "Paramount War"],
  openGraph: {
    title: "One Piece TCG Database",
    description: "Complete One Piece TCG card catalog with search and filtering",
    type: "website",
    siteName: "One Piece TCG Database",
  },
  twitter: {
    card: "summary_large_image",
    title: "One Piece TCG Database",
    description: "Complete One Piece TCG card catalog with search and filtering",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-full flex flex-col bg-[#0a0a12] antialiased">
        <NavBar />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-[#1e1e2e] py-6 text-center text-zinc-600 text-sm">
          One Piece TCG Database — fan project
        </footer>
      </body>
    </html>
  );
}