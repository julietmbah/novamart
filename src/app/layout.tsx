import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";

const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], display: "swap" });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: { default: "NovaMart | Shop Smarter, Live Better", template: "%s | NovaMart" },
  description: "Discover electronics, fashion, beauty and home essentials at NovaMart.",
  applicationName: "NovaMart",
};

// Apply the saved or system theme before the browser paints the page.
const themeScript = `try { var t = localStorage.getItem('novamart-theme'); if (t === 'light' || t === 'dark') document.documentElement.dataset.theme = t; } catch (_) {}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${manrope.variable} ${inter.variable} h-full antialiased`}>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
