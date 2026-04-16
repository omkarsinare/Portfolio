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

// SEO Update: Metadata for Google Search Console and branding
export const metadata: Metadata = {
  title: "Omkar Sinare | Computer Engineer",
  description: "Official portfolio of Omkar Sinare, specializing in Data Engineering, Automation, and AIML",
  verification: {
    google: "Mnoa_EMSVg0m5e0PG4dLzXcJJqpPGj_DQGyYr4zCkBI",
  },
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
