import type React from "react";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { activeSeason } from "@/lib/welcome-season";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ronnys.online"),
  alternates: { canonical: "/" },
  title: "Ronny’s Food Truck",
  description:
    "El carrito rojo de Ronny’s. Malteadas, crepas, waffles, hamburguesas y más antojos para compartir.",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false, noimageindex: true, noarchive: true } },
  icons: {
    icon: { url: "/images/brand/ronny-flat-logo.png", type: "image/png", sizes: "1254x1254" },
    shortcut: "/images/brand/ronny-flat-logo.png",
    apple: { url: "/images/brand/ronny-flat-logo.png", sizes: "1254x1254", type: "image/png" },
  },
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        {activeSeason === "muertos" && <link rel="preload" href="/fonts/shrikhand-latin-400.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />}
      </head>
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
