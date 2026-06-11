import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Omkar Sinare | Data Engineer & Automation Specialist",
  description:
    "Portfolio of Omkar Sinare — Data Engineering, Automation, and ML/AI. Processing 300k+ rows, building fuzzy matching engines, and shipping real tools.",
  verification: {
    google: "Mnoa_EMSVg0m5e0PG4dLzXcJJqpPGj_DQGyYr4zCkBI",
  },
  openGraph: {
    title: "Omkar Sinare | Data Engineer",
    description: "Data Engineering, Automation & ML. Pune, Maharashtra.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="bg-[#0A0A0A] text-white">{children}</body>
    </html>
  );
}
