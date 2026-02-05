import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { profile } from "@/lib/profile";
import { getSiteUrl } from "@/lib/site";

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
    default: `${profile.name} | Frontend Developer`,
    template: `%s | ${profile.name}`,
  },
  description: profile.summary,
  metadataBase: getSiteUrl(),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${profile.name} | Frontend Developer`,
    description: profile.summary,
    type: "website",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} | Frontend Developer`,
    description: profile.summary,
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
