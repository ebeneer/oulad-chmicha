import type { Metadata } from "next";
import { Fraunces, Geist_Mono, Rubik } from "next/font/google";
import "./globals.css";
import { absoluteUrl, siteConfig } from "@/lib/seo";
import PwaRegister from "@/components/pwa-register";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: "%s | Oulad Chmicha",
  },
  description: siteConfig.description,
  alternates: { canonical: siteConfig.url },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: absoluteUrl("/images/piscine-bungalows-oulad-chmicha.jpg"),
        width: 1200,
        height: 630,
        alt: "Oulad Chmicha - piscine et bungalows",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [absoluteUrl("/images/piscine-bungalows-oulad-chmicha.jpg")],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${rubik.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-stone-50 text-stone-900" suppressHydrationWarning>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-stone-900 focus:px-3 focus:py-2 focus:text-white"
        >
          Aller au contenu principal
        </a>
        <PwaRegister />
        <div id="main-content" className="flex min-h-full flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
