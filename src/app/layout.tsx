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

export const metadata: Metadata = {
  title: {
    default: "Neelapu Harish Reddy | Frontend Developer",
    template: "%s | Neelapu Harish Reddy",
  },
  description:
    "Frontend Developer building accessible, responsive, and performant web apps with React, Next.js, TypeScript, and Tailwind CSS.",
  openGraph: {
    title: "Neelapu Harish Reddy | Frontend Developer",
    description:
      "Accessible, responsive, and performant web apps with React, Next.js, TypeScript, and Tailwind CSS.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
