import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
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
    default: `${profile.name} | Software Engineer`,
    template: `%s | ${profile.name}`,
  },
  description: profile.metaDescription,
  metadataBase: getSiteUrl(),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${profile.name} | Software Engineer`,
    description: profile.metaDescription,
    type: "website",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} | Software Engineer`,
    description: profile.metaDescription,
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
      <head>
        <noscript>
          <style>{`[style*="opacity: 0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        {/* Only on Vercel: the script is served from /_vercel/insights, which does not exist locally. */}
        {process.env.VERCEL ? <Analytics /> : null}
      </body>
    </html>
  );
}
