import type React from "react";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ronnys.online"),
  alternates: { canonical: "/" },
  title: "Ronny’s",
  description:
    "El carrito rojo de Ronny’s en New York, Ecatepec. Malteadas, crepas, waffles, hamburguesas y más antojos para compartir.",
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
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
