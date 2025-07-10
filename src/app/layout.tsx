import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "QRVault",
  description: "Generate QR codes from uoloaded files",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
