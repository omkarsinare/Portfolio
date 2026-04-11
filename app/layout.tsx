import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// SEO Update: Changed 'Onkar' to 'Omkar' to match your branding
export const metadata: Metadata = {
  title: "Omkar Sinare | Data Analyst & Automation Engineer",
  description: "Official portfolio of Omkar Sinare, specializing in Data Engineering, Automation, and Cyber Attack detection.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      /* Removed 'h-full' to prevent forced empty vertical space */
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="flex flex-col bg-black text-white">
        {children}
      </body>
    </html>
  );
}
