import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "./StoreProvider";

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
    <html lang="eng">
      <body>
        <StoreProvider>
          {children}
        </StoreProvider>;  
      </body>
    </html> 
  )
}
