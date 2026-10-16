import type React from "react";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ronny Food Truck - Dulzura y Diversión en Ecatepec",
  description:
    "Food truck de postres y antojitos en Las Vegas, Ecatepec. Malteadas, crepas, marquesitas y papas preparadas. ¡Ven a probar la diversión sobre ruedas!",
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
