import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-toggle";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Listify AI - AI listing automation for Shopify sellers",
  description: "Create SEO-ready Shopify product listings from images, product URLs, and rough notes with AI."
};

export const viewport: Viewport = { themeColor: [{ media: "(prefers-color-scheme: light)", color: "#fbfaf7" }, { media: "(prefers-color-scheme: dark)", color: "#11161d" }] };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><body className={inter.className}><ThemeProvider>{children}</ThemeProvider></body></html>;
}
