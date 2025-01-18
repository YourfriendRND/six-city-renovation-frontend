import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "6 cities",
  description: "Your hotel search engine",
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
